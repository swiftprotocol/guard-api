import type { Application } from 'express'
import dotenv from 'dotenv'

import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import { Client } from 'pg'

declare global {
  var sql: Client
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
app.use('/sql', require('./pages/sql'))

// Start server & listen for requests
const PORT = process.env.PORT || 3450
try {
  app.listen(PORT, async () => {
    const client = new Client({
      host: process.env.POSTGRES_HOST!,
      password: process.env.POSTGRES_PASS!,
      port: parseInt(process.env.POSTGRES_PORT!),
      database: 'postgres',
      user: 'guard',
      ssl: { rejectUnauthorized: false },
    })

    await client.connect().catch((err) => {
      throw Error('[POSTGRESQL] Connection Error: ' + err.stack)
    })

    globalThis.sql = client

    console.log('🐘 PostgreSQL agent running.')
    console.log(`🎉 Running on *::${PORT}`)
  })
} catch (err) {
  console.error(err)
}
