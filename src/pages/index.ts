import type { Request, Response } from 'express'
import express from 'express'

const router = express.Router()

router.get('/', (_: Request, res: Response): Response => {
  return res.status(200).send(`
    <h2>Guard API</h2>
    <ul>
      <li><a href="/status">/status</a></li>
      <li><a href="/put/[address]/[key]">/put/[address]/[key]</li>
      <li><a href="/retrieve/[address]/[key]">/retrieve/[address]/[key]</a></li>
      <li><a href="/notify">/notify</li>
    </ul>
  `)
})

module.exports = router
