import type { Request, Response } from 'express'
import express from 'express'
import { Pool } from 'pg'
import { retrieveData } from '../../data'
import { StdTx } from '@keplr-wallet/types'
import { SigningStargateClient } from '@swiftprotocol/stargate'
import { Bech32, fromBase64 } from '@cosmjs/encoding'
import { rawSecp256k1PubkeyToRawAddress } from '@cosmjs/amino'

const router = express.Router()

declare global {
  var sql: Pool
}

router.get('/', async (_: Request, res: Response) => {
  return res.status(405).end('Cannot GET /sql. Use POST instead.')
})

router.post('/:userAddress/:key', async (req: Request, res: Response): Promise<Response> => {
  const { value, namespace, msg }: { value: string; namespace: string; msg: StdTx } = req.body
  const { userAddress, key } = req.params

  if (!userAddress || !key || !msg) return res.status(422).json({ error: 'Missing user address, key or signature.' })
  if (!value) return res.status(422).json({ error: 'Missing value.' })

  try {
    // Verify user signature
    const verified = await SigningStargateClient.experimentalAdr36Verify(msg)

    const rawSecp256k1Pubkey = fromBase64(msg.signatures[0].pub_key.value)
    const rawAddress = rawSecp256k1PubkeyToRawAddress(rawSecp256k1Pubkey)
    const signerAddress = Bech32.encode('juno', rawAddress)

    if (!verified) return res.status(401).json({ error: 'Invalid signature, could not verify identity.' })

    if (userAddress !== signerAddress)
      return res.status(401).json({ error: 'Request address and signer address do not match.' })

    // Connect client
    const client = await globalThis.sql.connect()

    // Insert data
    const data = await client.query(
      `INSERT INTO key_value (key, value) VALUES ('${
        namespace ? namespace + '/' : ''
      }${key}+${userAddress}', '${value}') ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;`,
    )

    // Store data in user's analytics profile
    const decryptedValue = await retrieveData(userAddress, (namespace ? namespace + '/' : '') + key)
    if (!namespace)
      globalThis.analytics.identify({
        userId: userAddress,
        traits: {
          [key]: decryptedValue,
        },
      })
    globalThis.analytics.track({
      userId: userAddress,
      event: 'Store Data',
      properties: { [key]: decryptedValue },
    })

    client.release()

    return res.status(200).json(data.rows[0])
  } catch (error) {
    console.log(error)
    return res.status(500).end((error as any).message)
  }
})

module.exports = router
