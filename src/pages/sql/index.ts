import type { Request, Response } from 'express'
import express from 'express'
import { Pool } from 'pg'

const router = express.Router()

declare global {
  var sql: Pool
}

router.get('/', async (_: Request, res: Response) => {
  return res.status(405).end('Cannot GET /sql. Use POST instead.')
})

router.post('/', async (req: Request, res: Response): Promise<Response> => {
  const { query, values }: { query: string; values?: any[] } = req.body
  const hostname = req.headers.origin

  if (!query) return res.status(422).json({ error: 'Missing query.' })
  if (query.includes('$') && (!values || values.length < 1)) return res.status(422).json({ error: 'Missing values.' })

  // Verify that the host is whitelisted
  if (!process.env.HOSTS!.split(',').includes(hostname!)) return res.status(401).json({ error: 'Host unauthorized.' })

  try {
    // Connect client
    const client = await globalThis.sql.connect()

    // Retrieve data
    const data = await client.query(query, values)

    client.release()

    return res.status(200).json(data.rows[0])
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error })
  }
})

module.exports = router
