import type { FastifyInstance } from 'fastify'
import { getAllLivechatClients } from '../../../sql/livechat.js'
import { ErrorResponseObject, type ErrorResponseType } from '../../../types.js'
import { ClientsResponse, type ClientsResponseType } from './types.js'

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
        res.status(500).send({ error: 'Internal Server Error' })
      }
    }
  )

  done()
}
