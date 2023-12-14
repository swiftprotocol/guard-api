import type { FastifyInstance } from 'fastify'
import { verifySignature } from '../../../helpers.js'
import { retrieveAppById } from '../../../sql/apps.js'
import { storeSubscription } from '../../../sql/notify.js'
import { retrieveKeyByPubkey } from '../../../sql/passkeys.js'
import { ErrorResponseObject, type ErrorResponseType } from '../../../types.js'
import {
  SubscribeRequest,
  type SubscribeRequestType,
  type SubscribeResponseType,
} from './types.js'

export default function (
  fastify: FastifyInstance,
  _: any,
  done: (err?: Error | undefined) => void
) {
  fastify.post<{
    Body: SubscribeRequestType
    Reply: SubscribeResponseType | ErrorResponseType
  }>(
    '/',
    {
      schema: {
        body: SubscribeRequest,
        response: {
          200: SubscribeRequest,
          ...ErrorResponseObject,
        },
      },
    },
    async (req, res) => {
      const { pubkey, signature, subscription, app } = req.body

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

        const appData = await retrieveAppById(app)
        if (!appData)
          return res.status(404).send({
            error: `Could not find app with ID ${app}.`,
          })

        const subscriptionEncoded = Buffer.from(
          JSON.stringify(subscription)
        ).toString('base64')

        await storeSubscription(pubkey, app, subscriptionEncoded)

        return res.status(200).send({ pubkey })
      } catch (e) {
        return res.status(500).send({ error: (e as Error).message })
      }
    }
  )
  done()
}
