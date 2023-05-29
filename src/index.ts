import type { Application } from 'express'
import dotenv from 'dotenv'

import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import { Pool } from 'pg'
import { Analytics } from '@segment/analytics-node'
import { CronJob } from 'cron'
import axios from 'axios'

declare global {
  var sql: Pool
  var analytics: Analytics
  var job: CronJob
}

// Load .env
dotenv.config({ path: `${__dirname}/../.env` })

// Config Express.js
const app: Application = express()
app.use(cors()) // Allow all CORS
app.use(bodyParser.json()) // Use JSON body

// Load pages
app.use('/', require('./pages'))
app.use('/status', require('./pages/status'))
app.use('/retrieve', require('./pages/retrieve'))
app.use('/put', require('./pages/put'))
app.use('/email', require('./pages/email'))
app.use('/notify', require('./pages/notify'))

// Start server & listen for requests
const PORT = process.env.PORT || 3450
try {
  const server = app.listen(PORT, async () => {
    const client = new Pool({
      host: process.env.POSTGRES_HOST!,
      password: process.env.POSTGRES_PASS!,
      port: parseInt(process.env.POSTGRES_PORT!),
      database: 'postgres',
      user: 'guard',
      ssl: { rejectUnauthorized: false },
    })

    globalThis.sql = client

    const analytics = new Analytics({
      writeKey: process.env.SEGMENT_WRITE_KEY!,
    })

    globalThis.analytics = analytics

    // Send heartbeat to BetterStack Uptime every 15 minutes
    if (process.env.HEARTBEAT_URL) {
      axios(process.env.HEARTBEAT_URL!)
      const job = new CronJob('*/15 * * * *', () => axios(process.env.HEARTBEAT_URL!), null, true, 'America/New_York')
      globalThis.job = job
    }

    console.log(`🎉 Running on *::${PORT}`)
  })

  const onExit = async () => {
    await analytics.closeAndFlush()
    server.close(() => {
      console.log('❌ Closing server...')
      process.exit()
    })
  }

  ;['SIGINT', 'SIGTERM'].forEach((code) => process.on(code, onExit))
} catch (err) {
  console.error(err)
}
