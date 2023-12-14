import type { FastifyInstance } from 'fastify'
import { verifySignature } from '../../../helpers.js'
import { retrieveAppById } from '../../../sql/apps.js'
import {
  retrieveAuthorizations,
  storeAuthorizations,
} from '../../../sql/notify.js'
import { retrieveKeyByPubkey } from '../../../sql/passkeys.js'
import { ErrorResponseObject, type ErrorResponseType } from '../../../types.js'
import {
  GetRequest,
  GetResponse,
  SetRequest,
  SetResponse,
  type GetRequestType,
  type GetResponseType,
  type SetRequestType,
  type SetResponseType,
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
        const auth = await retrieveAuthorizations(pubkey)
        if (!auth)
          return res
            .status(404)
            .send({ error: 'Could not find passkey for specified address.' })

        return res.status(200).send({
          authorizations: auth.authorizations
            .split(',')
            .filter((str: string) => str !== ''),
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
      const { signature, pubkey, authorizations } = req.body

      try {
        const passkey = await retrieveKeyByPubkey(pubkey)
        if (!passkey)
          return res
            .status(404)
            .send({ error: 'Could not find passkey for specified public key.' })

        const verified = await verifySignature(
          pubkey,
          signature,
          passkey.address
        )

        if (!verified)
          return res.status(401).send({
            error: 'Invalid signature, could not verify identity.',
          })

        for (const authorization of authorizations) {
          const app = await retrieveAppById(authorization)
          if (!app)
            return res.status(404).send({
              error: `Could not find app with ID ${authorization}.`,
            })
        }

        await storeAuthorizations(pubkey, authorizations.join(','))

        return res.status(200).send({ pubkey, authorizations })
      } catch (e) {
        return res.status(500).send({ error: (e as Error).message })
      }
    }
  )

  done()
}
