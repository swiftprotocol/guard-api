import type { FastifyInstance } from 'fastify'
import WebPush from 'web-push'
import { verifySignature } from '../../helpers.js'
import { retrieveAppByPubkey } from '../../sql/apps.js'
import {
  retrieveAuthorizations,
  retrieveClient,
  retrieveSubscription,
} from '../../sql/notify.js'
import { retrieveKeyByAddress } from '../../sql/passkeys.js'
import { ErrorResponseObject, type ErrorResponseType } from '../../types.js'
import {
  EmailRequest,
  EmailResponse,
  PushRequest,
  PushResponse,
  type EmailRequestType,
  type EmailResponseType,
  type PushRequestType,
  type PushResponseType,
} from './types.js'

export default function (
  fastify: FastifyInstance,
  _: any,
  done: (err?: Error | undefined) => void
) {
  // @TODO
  fastify.post<{
    Body: EmailRequestType
    Reply: EmailResponseType | ErrorResponseType
  }>(
    '/email',
    {
      schema: {
        body: EmailRequest,
        response: {
          200: EmailResponse,
          ...ErrorResponseObject,
        },
      },
    },
    async (_, res) => {
      // const {  } = req.body

      try {
        // @TODO
        return res
          .status(200)
          .send({ message: '/email endpoint has not been migrated to V1 yet' })
      } catch (e) {
        return res.status(500).send({ error: (e as Error).message })
      }
    }
  )

  fastify.post<{
    Body: PushRequestType
    Reply: PushResponseType | ErrorResponseType
  }>(
    '/push',
    {
      schema: {
        body: PushRequest,
        response: {
          200: PushResponse,
          ...ErrorResponseObject,
        },
      },
    },
    async (req, res) => {
      const { recipientHexAddress, pubkey, signature, notification } = req.body

      try {
        const passkey = await retrieveKeyByAddress(recipientHexAddress)
        if (!passkey)
          return res.status(404).send({
            error: 'Could not find passkey for specified hex address.',
          })

        const app = await retrieveAppByPubkey(pubkey)

        if (!app)
          return res
            .status(404)
            .send({ error: 'Could not find app ID for specified public key.' })

        const authorizations = await retrieveAuthorizations(passkey.pubkey)

        if (!authorizations)
          return res.status(404).send({
            error: 'Could not find authorizations for specified hex address.',
          })

        const authorization = authorizations.authorizations
          .split(',')
          .find((str: string) => str.includes(app.id))

        if (!authorization || !authorization.includes('push'))
          return res.status(404).send({
            error: 'You are not authorized to send notifications to this user.',
          })

        const verified = await verifySignature(pubkey, signature, app.id)

        if (!verified)
          return res.status(401).send({
            error: 'Invalid signature, could not verify app identity.',
          })

        const activeClient = await retrieveClient(passkey.pubkey, app.id)

        if (activeClient) {
          fastify.io
            .of('/notify')
            .to(activeClient.socket)
            .emit('notification', notification)

          return res.status(200).send({ delivered: true })
        } else {
          const subscriptionEncoded = await retrieveSubscription(
            passkey.pubkey,
            app.id
          )

          if (!subscriptionEncoded)
            return res.status(404).send({
              error:
                'Could not find push subscription for this app and address.',
            })

          const subscription = JSON.parse(
            Buffer.from(subscriptionEncoded.subscription, 'base64').toString()
          )

          const sendResult = await WebPush.sendNotification(
            subscription,
            JSON.stringify(notification)
          )

          if (sendResult.statusCode !== 200 && sendResult.statusCode !== 201) {
            return res.status(200).send({ delivered: false })
          } else {
            return res.status(200).send({ delivered: true })
          }
        }
      } catch (e) {
        return res.status(500).send({ error: (e as Error).message })
      }
    }
  )

  done()
}
