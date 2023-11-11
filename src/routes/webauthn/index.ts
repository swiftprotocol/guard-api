import { verifyRegistration } from '@swiftprotocol/auth/server.js'
import { randomChallenge } from '@swiftprotocol/auth/utils.js'
import cron from 'cron'
import { FastifyInstance } from 'fastify'
import { hexPubKeyToAddress } from '../../helpers.js'
import { ErrorResponseObject, ErrorResponseType } from '../../types.js'
import {
  ChallengeRequest,
  ChallengeRequestType,
  ChallengeResponse,
  ChallengeResponseType,
  VerifyRequest,
  VerifyRequestType,
  VerifyResponse,
  VerifyResponseType,
} from './types.js'

export default function (
  fastify: FastifyInstance,
  _: any,
  done: (err?: Error | undefined) => void
) {
  fastify.post<{
    Body: ChallengeRequestType
    Reply: ChallengeResponseType | ErrorResponseType
  }>(
    '/challenge',
    {
      schema: {
        body: ChallengeRequest,
        response: {
          200: ChallengeResponse,
          ...ErrorResponseObject,
        },
      },
    },
    async (req, res) => {
      const { pubkey } = req.body
      const { origin } = req.headers

      if (!origin) return res.status(500).send({ error: 'Invalid origin.' })

      try {
        const hexAddress = hexPubKeyToAddress(pubkey)
        const challenge = randomChallenge()

        globalThis.authChallenges.set(pubkey, { challenge, origin })

        // In 5 minutes, if the challenge is still there, remove it
        // This is to prevent a malicious actor from filling up the memory
        new cron.CronJob(
          '*/5 * * * *',
          () => {
            if (globalThis.authChallenges.has(pubkey)) {
              globalThis.authChallenges.delete(pubkey)
            }
          },
          null,
          true,
          'America/New_York'
        )

        return res.status(200).send({ hexAddress, challenge })
      } catch (e) {
        return res.status(500).send({ error: (e as Error).message })
      }
    }
  )

  fastify.post<{
    Body: VerifyRequestType
    Reply: VerifyResponseType | ErrorResponseType
  }>(
    '/verify',
    {
      schema: {
        body: VerifyRequest,
        response: {
          200: VerifyResponse,
          ...ErrorResponseObject,
        },
      },
    },
    async (req, res) => {
      const { pubkey, registration } = req.body as {
        pubkey: any
        registration: any
      }

      try {
        const challenge = globalThis.authChallenges.get(pubkey)
        if (!challenge)
          return res
            .status(404)
            .send({ error: 'No challenge found for this public key.' })

        const verified = await verifyRegistration(registration, challenge)
        const hexAddress = hexPubKeyToAddress(pubkey)

        return res.status(200).send({
          hexAddress,
          credential: verified.credential,
          client: verified.client,
        })
      } catch (e) {
        return res.status(500).send({ error: (e as Error).message })
      }
    }
  )

  done()
}
