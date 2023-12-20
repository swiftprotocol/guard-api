import { pubkeyToRawAddress } from '@cosmjs/amino'
import { fromBech32 } from '@cosmjs/encoding'
import type { FastifyInstance } from 'fastify'
import type { StdTx } from '../../../gen/cosmos.js'
import { experimentalAdr36Verify } from '../../../helpers.js'
import {
  addLivechatRegistration,
  getAllLivechatClients,
  retrieveLivechatRegistration,
} from '../../../sql/livechat.js'
import { ErrorResponseObject, type ErrorResponseType } from '../../../types.js'
import {
  ClientsResponse,
  RegisterRequest,
  RegisterResponse,
  RegistrationRequest,
  RegistrationResponse,
  type ClientsResponseType,
  type RegisterRequestType,
  type RegisterResponseType,
  type RegistrationRequestType,
  type RegistrationResponseType,
} from './types.js'

export default function (
  fastify: FastifyInstance,
  _: any,
  done: (err?: Error | undefined) => void
) {
  fastify.get<{
    Reply: ClientsResponseType | ErrorResponseType
  }>(
    '/clients',
    {
      schema: {
        response: {
          200: ClientsResponse,
          ...ErrorResponseObject,
        },
      },
    },
    async (_, res) => {
      try {
        const clients = await getAllLivechatClients()
        res.status(200).send({ clients })
      } catch (e) {
        res.status(500).send({ error: (e as Error).message })
      }
    }
  )

  fastify.post<{
    Body: RegistrationRequestType
    Reply: RegistrationResponseType | ErrorResponseType
  }>(
    '/registration',
    {
      schema: {
        body: RegistrationRequest,
        response: {
          200: RegistrationResponse,
          ...ErrorResponseObject,
        },
      },
    },
    async (req, res) => {
      const { address } = req.body
      try {
        const rawAddress = fromBech32(address).data
        const hexAddress = Buffer.from(rawAddress).toString('hex')

        const registration = await retrieveLivechatRegistration(hexAddress)

        if (!registration)
          return res.status(404).send({
            error: 'Could not find registration for specified address.',
          })

        return res.status(200).send({ registration })
      } catch (e) {
        return res.status(500).send({ error: (e as Error).message })
      }
    }
  )

  fastify.post<{
    Body: RegisterRequestType
    Reply: RegisterResponseType | ErrorResponseType
  }>(
    '/register',
    {
      schema: {
        body: RegisterRequest,
        response: {
          200: RegisterResponse,
          ...ErrorResponseObject,
        },
      },
    },
    async (req, res) => {
      const { walletSignature, username } = req.body

      try {
        const decodedSignature = JSON.parse(
          Buffer.from(walletSignature, 'base64').toString()
        ) as StdTx

        const verified = await experimentalAdr36Verify(decodedSignature)

        if (!verified)
          return res.status(401).send({
            error: 'Invalid wallet signature, could not verify identity.',
          })

        const rawAddress = pubkeyToRawAddress(
          decodedSignature.signatures[0].pub_key
        )
        const hexAddress = Buffer.from(rawAddress).toString('hex')

        await addLivechatRegistration(hexAddress, username)
      } catch (e) {
        return res.status(500).send({ error: (e as Error).message })
      }
    }
  )

  done()
}
