import type { Request, Response } from 'express'
import express from 'express'
import { retrieveData } from '../../data'
import mail from '@sendgrid/mail'

const router = express.Router()

const template_id = 'd-69694c42327145dfa43d387e39584d5b'

const titleCase = (s: string) => s.replace(/^_*(.)|_+(.)/g, (s, c, d) => (c ? c.toUpperCase() : ' ' + d.toUpperCase()))

router.get('/', async (_: Request, res: Response) => {
  return res.status(405).end('Cannot GET /retrieve. Use POST instead.')
})

router.post('/:userAddress', async (req: Request, res: Response): Promise<Response> => {
  const { userAddress } = req.params
  const api_key = req.headers.authorization
  const { content, title } = req.body

  if (!userAddress) return res.status(422).json({ error: 'Missing user address.' })
  if (!content || !title) return res.status(422).json({ error: 'Missing content or title.' })

  let app_id

  // Verify that api_key exists
  try {
    const client = await globalThis.sql.connect()
    const data = await client.query(`SELECT id FROM notify_keys WHERE api_key = '${api_key}'`)
    client.release()

    if (!data.rows[0]) return res.status(401).json({ error: 'Host unauthorized.' })
    else app_id = data.rows[0].id
  } catch (error) {
    console.log(error)
    return res.status(500).end(error)
  }

  try {
    // Retrieve authorizations
    const authStr = await retrieveData(userAddress, 'authorizations')
    const authorizations = authStr.split(',')

    if (!authorizations.includes(app_id)) return res.status(401).json({ error: 'Access unauthorized' })

    // Retrieve email
    const email = await retrieveData(userAddress, 'email')

    const mailMsg = {
      to: email,
      from: {
        name: titleCase(app_id),
        email: 'checkout@swiftprotocol.zone',
      },
      templateId: template_id,
      personalizations: [
        {
          to: [
            {
              email,
            },
          ],
          dynamicTemplateData: {
            content,
            title,
          },
        },
      ],
    }

    mail.setApiKey(process.env.SENDGRID_API_KEY!)

    mail.send(mailMsg).catch((err) => {
      throw Error(err)
    })

    return res.status(200).json({ result: 'sent' })
  } catch (error) {
    console.log(error)
    return res.status(500).end(error)
  }
})

module.exports = router
