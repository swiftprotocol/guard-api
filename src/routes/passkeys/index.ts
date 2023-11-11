import { pubkeyToRawAddress } from '@cosmjs/amino'
import type { FastifyInstance } from 'fastify'
import { experimentalAdr36Verify, hexPubKeyToAddress } from '../../helpers.js'
import { retrieveKey, storeKey } from '../../sql/passkeys.js'
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
      const { pubkey } = req.body

      try {
        const hexAddress = hexPubKeyToAddress(pubkey)
        const passkey = await retrieveKey(hexAddress)

        if (!passkey)
          return res
            .status(404)
            .send({ error: 'Could not find passkey for this address.' })

        return res.status(200).send({ hexAddress, passkey })
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
      const { signature, credential } = req.body

      try {
        const verified = await experimentalAdr36Verify(signature)

        if (!verified)
          return res
            .status(401)
            .send({ error: 'Invalid signature, could not verify identity.' })

        const rawAddress = pubkeyToRawAddress(signature.signatures[0].pub_key)
        const hexAddress = Buffer.from(rawAddress).toString('hex')

        await storeKey(hexAddress, credential)

        return res.status(200).send({ hexAddress, credential })
      } catch (e) {
        return res.status(500).send({ error: (e as Error).message })
      }
    }
  )

  done()
}
