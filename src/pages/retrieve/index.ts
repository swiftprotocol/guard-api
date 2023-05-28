import type { Request, Response } from 'express'
import express from 'express'
import { getCosmWasmClient } from '../../cosmos'
import { CommerceQueryClient } from '@swiftprotocol/types'
import { SigningStargateClient } from '@swiftprotocol/stargate'
import { StdTx } from '@keplr-wallet/types'
import { fromBase64, Bech32 } from '@cosmjs/encoding'
import { rawSecp256k1PubkeyToRawAddress } from '@cosmjs/amino'
import { retrieveData } from '../../data'

const router = express.Router()

router.get('/', async (_: Request, res: Response) => {
  return res.status(405).end('Cannot GET /retrieve. Use POST instead.')
})

router.post('/:userAddress/:key/:namespace', async (req: Request, res: Response): Promise<Response> => {
  const body = req.body // { msg, type, contract_address }
  const { userAddress, key, namespace } = req.params
  const { type } = body

  if (!userAddress || !key) return res.status(422).json({ error: 'Missing user address or key.' })

  if (type === 'contract' || type === 'address')
    if (!body.msg) return res.status(422).json({ error: 'Missing signature.' })

  if (type === 'contract')
    if (!body.contract_address) return res.status(422).json({ error: 'Missing contract address.' })

  try {
    let signerAddress

    if (type !== 'org') {
      // Verify that the signature is valid
      const { msg } = body as { msg: StdTx }
      const verified = await SigningStargateClient.experimentalAdr36Verify(msg)

      const rawSecp256k1Pubkey = fromBase64(msg.signatures[0].pub_key.value)
      const rawAddress = rawSecp256k1PubkeyToRawAddress(rawSecp256k1Pubkey)
      signerAddress = Bech32.encode('juno', rawAddress)

      if (!verified) return res.status(401).json({ error: 'Invalid signature, could not verify identity.' })
    } else {
      // TODO: Implement organization keys
      return res.status(500).json({ error: 'Organizations not implemented.' })
    }

    if (type === 'contract') {
      // Verify that the signer is an admin of the contract
      if (!body.contract_address) return res.status(422).json({ error: 'Missing contract address.' })
      const cosmWasmClient = await getCosmWasmClient(process.env.RPC!)
      const client = new CommerceQueryClient(cosmWasmClient, body.contract_address)
      const { admins } = await client.adminList()
      if (!admins.includes(signerAddress))
        return res.status(401).json({ error: 'Signer is not an admin of this contract.' })
    }

    // If the request is not from the owner of the data, check authorizations
    if (signerAddress !== userAddress) {
      // Retrieve authorizations
      const authStr = await retrieveData(userAddress, 'authorizations')
      const authorizations = authStr.split(',')

      const localAuthorization = `${type}+${type === 'contract' ? body.contract_address : signerAddress}`
      if (!authorizations.includes(localAuthorization)) return res.status(401).json({ error: 'Access unauthorized' })
    }

    // Retrieve data
    const data = await retrieveData(userAddress, (namespace ? namespace + '/' : '') + key)

    return res.status(200).json({
      key,
      address: userAddress,
      value: data,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).end(error)
  }
})

module.exports = router
