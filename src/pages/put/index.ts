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

router.post('/:userAddress/:key', async (req: Request, res: Response): Promise<Response> => {
  const { value, namespace }: { value: string; namespace: string } = req.body
  const { userAddress, key } = req.params
  const hostname = req.headers.origin

  if (!userAddress || !key) return res.status(422).json({ error: 'Missing user address or key.' })
  if (!value) return res.status(422).json({ error: 'Missing value.' })

  // Get list of hosts
  if (process.env.NODE_ENV === 'production') {
    // If production, get hosts from database
    try {
      const client = await globalThis.sql.connect()
      const data = await client.query(`SELECT host FROM hosts WHERE host = '${hostname}'`)
      client.release()

      if (!data.rows[0]) return res.status(401).json({ error: 'Host unauthorized.' })
    } catch (error) {
      console.log(error)
      return res.status(500).end(error)
    }
  } else {
    // If development, get hosts from environment variables
    if (!process.env.HOSTS!.split(',').includes(hostname!)) return res.status(401).json({ error: 'Host unauthorized.' })
  }

  try {
    // Connect client
    const client = await globalThis.sql.connect()

    // Insert data
    const data = await client.query(
      `INSERT INTO key_value (key, value) VALUES ('${
        namespace ? namespace + '/' : ''
      }${key}+${userAddress}', '${value}') ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;`,
    )

    client.release()

    return res.status(200).json(data.rows[0])
  } catch (error) {
    console.log(error)
    return res.status(500).end(error)
  }
})

module.exports = router
