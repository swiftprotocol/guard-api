import { fromBech32 } from '@cosmjs/encoding'
import { verifyRegistration } from '@swiftprotocol/auth/server.js'
import { randomChallenge } from '@swiftprotocol/auth/utils.js'
import cron from 'cron'
import type { FastifyInstance } from 'fastify'
import { ErrorResponseObject, type ErrorResponseType } from '../../types.js'
import {
  ChallengeRequest,
  ChallengeResponse,
  VerifyRequest,
  VerifyResponse,
  type ChallengeRequestType,
  type ChallengeResponseType,
  type VerifyRequestType,
  type VerifyResponseType,
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
      const { address } = req.body
      const { origin } = req.headers

      if (!origin) return res.status(500).send({ error: 'Invalid origin.' })

      try {
        const rawAddress = fromBech32(address).data
        const hexAddress = Buffer.from(rawAddress).toString('hex')

        const challenge = randomChallenge()

        globalThis.authChallenges.set(hexAddress, { challenge, origin })

        // In 5 minutes, if the challenge is still there, remove it
        // This is to prevent a malicious actor from filling up the memory
        new cron.CronJob(
          '*/5 * * * *',
          () => {
            if (globalThis.authChallenges.has(hexAddress)) {
              globalThis.authChallenges.delete(hexAddress)
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
      const { address, registration } = req.body

      try {
        const rawAddress = fromBech32(address).data
        const hexAddress = Buffer.from(rawAddress).toString('hex')

        const challenge = globalThis.authChallenges.get(hexAddress)
        if (!challenge)
          return res
            .status(404)
            .send({ error: 'No challenge found for this public key.' })

        const verified = await verifyRegistration(registration, challenge)

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
