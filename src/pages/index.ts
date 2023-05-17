import type { Request, Response } from 'express'
import express from 'express'

const router = express.Router()

router.get('/', (req: Request, res: Response): Response => {
  return res.status(200).send(`
    <h2>SwiftGuard API</h2>
    <ul>
      <li><a href="/status">/status</a></li>
      <li><a href="/retrieve/[address]/[key]">/retrieve/[address]/[key]</a></li>
      <li><a href="/sql">/sql</li>
    </ul>
  `)
})

module.exports = router
