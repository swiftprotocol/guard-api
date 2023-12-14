import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import type { Server as SocketIOServer } from 'socket.io'
import type { RegistrationChecks } from './types.js'

import axios from 'axios'
import dotenv from 'dotenv'
import path from 'path'

import FastifyCors from '@fastify/cors'
import Swagger from '@fastify/swagger'
import SwaggerUI from '@fastify/swagger-ui'
import Fastify from 'fastify'

import FastifySocketIO from './plugins/socketio.js'

import { CronJob } from 'cron'
import { fileURLToPath } from 'url'
import logo from './image.js'

import { SwaggerDefinitions } from './types.js'

import data from './routes/data/index.js'
import passkeys from './routes/passkeys/index.js'
import webauthn from './routes/webauthn/index.js'

import notify_auth from './routes/notify/auth/index.js'
import notify from './routes/notify/index.js'
import notify_subscribe from './routes/notify/subscribe/index.js'

import livechat from './routes/ws/livechat/index.js'

import { verifySignature } from './helpers.js'
import type {
  ClientToServerEventsType,
  InterServerEventsType,
  ServerToClientEventsType,
  SocketDataType,
} from './routes/ws/types.js'
import {
  addLivechatClient,
  queryIsLivechatClientConnected,
  removeLivechatClient,
} from './sql/livechat.js'
import { addClient, removeClient } from './sql/notify.js'
import { retrieveKeyByPubkey } from './sql/passkeys.js'

declare global {
  var authChallenges: Map<string, RegistrationChecks>
}

declare module 'fastify' {
  interface FastifyInstance {
    io: SocketIOServer<
      ClientToServerEventsType,
      ServerToClientEventsType,
      InterServerEventsType,
      SocketDataType
    >
  }
}

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

dotenv.config({ path: `${dirname}/../.env` })

const fastify = Fastify({
  logger: process.env.NODE_ENV === 'development',
}).withTypeProvider<TypeBoxTypeProvider>()

fastify.register(FastifyCors, {
  origin: '*',
  methods: ['POST'],
})

fastify.register(FastifySocketIO)

fastify.register(Swagger, {
  swagger: {
    info: {
      title: 'Swift Guard API',
      version: '1.0.0',
    },
    definitions: SwaggerDefinitions,
  },
})
fastify.register(SwaggerUI, {
  routePrefix: '/',
  uiConfig: {
    docExpansion: 'list',
    deepLinking: true,
  },
  logo: {
    type: 'image/png',
    content: Buffer.from(logo, 'base64'),
  },
  theme: {
    title: 'Swift Guard API',
  },
})

// Register routes
fastify.register(webauthn, { prefix: '/webauthn' })
fastify.register(passkeys, { prefix: '/passkeys' })
fastify.register(data, { prefix: '/data' })

fastify.register(notify, { prefix: '/notify' })
fastify.register(notify_auth, { prefix: '/notify/auth' })
fastify.register(notify_subscribe, { prefix: '/notify/subscribe' })

fastify.register(livechat, { prefix: '/ws/livechat' })

try {
  const port = parseInt(process.env.PORT || '3450')
  fastify.listen({ port, host: '0.0.0.0' }).then(async () => {
    const heartbeatUrl = process.env.HEARTBEAT_URL

    globalThis.authChallenges = new Map<string, RegistrationChecks>()

    // Send heartbeat to BetterStack Uptime every 15 minutes
    if (heartbeatUrl) {
      await axios(heartbeatUrl)
      console.log(`🏓 Established heartbeat connection`)
      new CronJob(
        '*/15 * * * *',
        () => axios(heartbeatUrl),
        null,
        true,
        'America/New_York'
      )
    }

    console.log(`🎉 Running on *::${port}`)

    fastify.io.of('/notify').on('connection', async (socket) => {
      socket.emit('healthcheck')

      if (
        !socket.handshake.query.pubkey ||
        !socket.handshake.query.signature ||
        !socket.handshake.query.app
      ) {
        return
      }

      socket.data.pubkey = socket.handshake.query.pubkey as string
      socket.data.signature = socket.handshake.query.signature as string
      socket.data.app = socket.handshake.query.app as string

      try {
        const passkey = await retrieveKeyByPubkey(socket.data.pubkey)
        if (!passkey) return

        const verified = await verifySignature(
          socket.data.pubkey,
          socket.data.signature,
          passkey.address
        )
        if (!verified) return

        await addClient(socket.data.pubkey, socket.data.app, socket.id)
      } catch (e) {
        return
      }

      socket.on('disconnect', () => {
        try {
          removeClient(socket.data.pubkey, socket.data.app!)
        } catch (e) {
          return
        }
      })
    })

    fastify.io.of('/livechat').on('connection', async (socket) => {
      socket.emit('healthcheck')

      if (!socket.handshake.query.pubkey || !socket.handshake.query.username) {
        return
      }

      socket.data.pubkey = socket.handshake.query.pubkey as string
      socket.data.username = socket.handshake.query.username as string

      try {
        await addLivechatClient(socket.data.pubkey, socket.data.username)
      } catch (e) {
        return
      }

      socket.on('chatMsgFromClient', async (msg) => {
        if (!msg) return

        try {
          const pubkeyIsConnected = await queryIsLivechatClientConnected(
            socket.data.pubkey
          )
          if (!pubkeyIsConnected) return

          fastify.io
            .of('/livechat')
            .emit(
              'chatMsgFromServer',
              socket.data.pubkey,
              socket.data.username!,
              msg
            )
        } catch (e) {
          return
        }
      })

      socket.on('disconnect', () => {
        try {
          removeLivechatClient(socket.data.pubkey)
        } catch (e) {
          return
        }
      })
    })
  })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}
