import type { Request, Response } from 'express'
import express from 'express'

const router = express.Router()

router.get('/', (req: Request, res: Response): Response => {
  return res.status(200).send(`
    <h2>Guard API</h2>
    <ul>
      <li><a href="/status">/status</a></li>
      <li><a href="/put/[address]/[key]/[namespace]">/put/[address]/[key]/[namespace]</li>
      <li><a href="/retrieve/[address]/[key]/[namespace]">/retrieve/[address]/[key]/[namespace]</a></li>
      <li><a href="/notify">/notify</li>
    </ul>
  `)
})

module.exports = router
