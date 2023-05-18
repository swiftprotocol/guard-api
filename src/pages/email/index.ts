import type { Request, Response } from 'express'
import express from 'express'
import { getCosmWasmClient, getJunoClient } from '../../cosmos'
import { CommerceQueryClient } from '@swiftprotocol/types'
import { SigningStargateClient } from '@swiftprotocol/stargate'
import { StdTx } from '@keplr-wallet/types'
import { fromBase64, Bech32 } from '@cosmjs/encoding'
import { rawSecp256k1PubkeyToRawAddress } from '@cosmjs/amino'
import { retrieveData } from '../../data'
import mail from '@sendgrid/mail'
import assets from '../../db/assets'
import { Cw20CoinVerified, Listing } from '@swiftprotocol/types/Commerce.types'
import { Coin } from 'juno-network/types/codegen/cosmos/base/v1beta1/coin'

const router = express.Router()

const emails = [
  {
    name: 'fulfillment_confirmation',
    template_id: 'd-df793d96cfc54daf83c995a69f33a2e7',
  },
  {
    name: 'shipping_confirmation',
    template_id: 'd-82722adc5bf04912a64001fd8c0d22c0',
  },
]

router.get('/', async (_: Request, res: Response) => {
  return res.status(405).end('Cannot GET /email. Use POST instead.')
})

router.post('/:userAddress/:type', async (req: Request, res: Response): Promise<Response> => {
  const body = req.body // { msg, contract_address, order }
  const { userAddress, type } = req.params

  if (!userAddress || !type) return res.status(422).json({ error: 'Missing user address, email type.' })

  if (!body.order) return res.status(422).json({ error: 'Missing order ID.' })
  if (!body.msg) return res.status(422).json({ error: 'Missing signature.' })
  if (!body.contract_address) return res.status(422).json({ error: 'Missing contract address.' })

  if (!emails.find((email) => email.name === type)) return res.status(422).json({ error: 'Incorrect email type.' })

  try {
    let signerAddress

    // Verify that the signature is valid
    const { msg } = body as { msg: StdTx }
    const verified = await SigningStargateClient.experimentalAdr36Verify(msg)

    const rawSecp256k1Pubkey = fromBase64(msg.signatures[0].pub_key.value)
    const rawAddress = rawSecp256k1PubkeyToRawAddress(rawSecp256k1Pubkey)
    signerAddress = Bech32.encode('juno', rawAddress)

    if (!verified) return res.status(401).json({ error: 'Invalid signature, could not verify identity.' })

    // Verify that the signer is an admin of the contract
    if (!body.contract_address) return res.status(422).json({ error: 'Missing contract address.' })
    const cosmWasmClient = await getCosmWasmClient(process.env.RPC!)
    const client = new CommerceQueryClient(cosmWasmClient, body.contract_address)
    const { admins } = await client.adminList()
    if (!admins.includes(signerAddress))
      return res.status(401).json({ error: 'Signer is not an admin of this contract.' })

    // Retrieve marketing & order data
    const { config } = await client.config()
    const { marketing } = await client.marketing()
    const { order } = await client.order({ id: body.order })
    const { cost } = await client.orderCost({ id: body.order })
    if (!order) return res.status(404).json({ error: 'Order not found.' })

    console.log(order, cost)

    // Retrieve item data
    const itemArr = order.items.map(async ({ listing_id, amount }) => {
      const listing = await client.listing({ id: listing_id })
      return { ...(listing?.listing as Listing), amount }
    })
    const items = await Promise.all(itemArr)
    const itemData = items.map((item) => {
      const uprice =
        'native' in Object(item.price)
          ? parseInt((item.price as { native: Coin }).native.amount) / 1_000_000
          : 'cw20' in Object(item.price)
          ? parseInt((item.price as { cw20: Cw20CoinVerified }).cw20.amount) / 1_000_000
          : 0
      return { ...item, uprice: uprice * item.amount }
    })

    // Retrieve token data
    const junoClient = await getJunoClient(process.env.RPC!)
    const tokenType = config.token.token_type
    let coin: string

    if (tokenType === 'cw20') {
      const tokenInfo = await cosmWasmClient.queryContractSmart(config.token.denom, {
        token_info: {},
      })
      coin = tokenInfo.symbol || ''
    } else {
      if (config.token.denom.includes('ibc/')) {
        const asset = assets.find((token) => {
          return token.juno_denom === config.token.denom
        })
        coin = asset ? asset.symbol : ''
      } else if (config.token.denom.includes('factory/')) {
        const metadata = await junoClient.cosmos.bank.v1beta1.denomMetadata({
          denom: config.token.denom,
        })
        coin = metadata ? metadata?.metadata?.symbol! : ''
      } else {
        const asset = assets.find((token) => token.denom === config.token.denom)
        coin = asset ? asset.symbol : ''
      }
    }

    console.log(coin)

    // Retrieve authorizations
    const authStr = await retrieveData(userAddress, 'authorizations')
    const authorizations = authStr.split(',')

    const localAuthorization = `contract+${body.contract_address}`
    if (!authorizations.includes(localAuthorization)) return res.status(401).json({ error: 'Access unauthorized' })

    // Retrieve email
    const email = await retrieveData(userAddress, 'email')

    console.log(email)

    // Send email
    const mailMsg = {
      to: email,
      from: {
        name: `${marketing.name} @ Swift Protocol`,
        email: 'checkout@swiftprotocol.zone',
      },
      templateId: emails.find((email) => email.name === type)?.template_id!,
      personalizations: [
        {
          to: [
            {
              email,
            },
          ],
          dynamicTemplateData: {
            merchant: marketing.name,
            items: itemData.map((item) => {
              return {
                name: item.attributes.name,
                image: item.attributes.images[0],
                amount: item.amount,
                price: item.uprice.toFixed(2) + ' ' + coin,
              }
            }),
            total: (parseInt(cost) / 1_000_000).toFixed(2) + ' ' + coin,
            ...req.body,
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
    return res.status(500).json({ error })
  }
})

module.exports = router
