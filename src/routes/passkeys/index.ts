import { pubkeyToRawAddress } from '@cosmjs/amino'
import { fromBech32 } from '@cosmjs/encoding'
import type { FastifyInstance } from 'fastify'
import { experimentalAdr36Verify, verifySignature } from '../../helpers.js'
import { retrieveKeyByAddress, storeKey } from '../../sql/passkeys.js'
import { ErrorResponseObject, ErrorResponseType } from '../../types.js'
import {
  GetRequest,
  GetRequestType,
  GetResponse,
  GetResponseType,
  SetRequest,
  SetRequestType,
  SetResponse,
  SetResponseType,
} from './types.js'

export default function (
  fastify: FastifyInstance,
  _: any,
  done: (err?: Error | undefined) => void
) {
  fastify.post<{
    Body: GetRequestType
    Reply: GetResponseType | ErrorResponseType
  }>(
    '/get',
    {
      schema: {
        body: GetRequest,
        response: {
          200: GetResponse,
          ...ErrorResponseObject,
        },
      },
    },
    async (req, res) => {
      const { address } = req.body

      try {
        const rawAddress = fromBech32(address).data
        const hexAddress = Buffer.from(rawAddress).toString('hex')

        const passkeyResponse = await retrieveKeyByAddress(hexAddress)

        if (!passkeyResponse)
          return res
            .status(404)
            .send({ error: 'Could not find passkey for this address.' })

        return res.status(200).send({
          hexAddress,
          pubkey: passkeyResponse.pubkey,
          passkey: passkeyResponse.passkey_id,
        })
      } catch (e) {
        return res.status(500).send({ error: (e as Error).message })
      }
    }
  )

  fastify.post<{
    Body: SetRequestType
    Reply: SetResponseType | ErrorResponseType
  }>(
    '/set',
    {
      schema: {
        body: SetRequest,
        response: {
          200: SetResponse,
          ...ErrorResponseObject,
        },
      },
    },
    async (req, res) => {
      const { walletSignature, signature, publicKey, credential } = req.body

      try {
        const verified = await experimentalAdr36Verify(walletSignature)

        if (!verified)
          return res.status(401).send({
            error: 'Invalid wallet signature, could not verify identity.',
          })

        const rawAddress = pubkeyToRawAddress(
          walletSignature.signatures[0].pub_key
        )
        const hexAddress = Buffer.from(rawAddress).toString('hex')

        const pubkeyVerified = await verifySignature(
          publicKey,
          signature,
          hexAddress
        )

        if (!pubkeyVerified)
          return res
            .status(401)
            .send({ error: 'Invalid signature, could not verify identity.' })

        await storeKey(publicKey, hexAddress, credential)

        return res.status(200).send({ hexAddress, credential })
      } catch (e) {
        return res.status(500).send({ error: (e as Error).message })
      }
    }
  )

  done()
}
