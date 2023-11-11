import { fromBech32 } from '@cosmjs/encoding'
import type { FastifyInstance } from 'fastify'
import { verifySignature } from '../../helpers.js'
import { retrieveData, storeData } from '../../sql/data.js'
import {
  retrieveKeyByAddress,
  retrieveKeyByPubkey,
} from '../../sql/passkeys.js'
import {
  ErrorResponseObject,
  ErrorResponseType,
  SymmKeyType,
} from '../../types.js'
import {
  GetRequest,
  GetRequestType,
  GetResponse,
  GetResponseType,
  SetRequest,
  SetRequestType,
  SetResponse,
  SetResponseType,
} from './types.js'

export default function (
  fastify: FastifyInstance,
  _: any,
  done: (err?: Error | undefined) => void
) {
  fastify.post<{
    Body: GetRequestType
    Reply: GetResponseType | ErrorResponseType
  }>(
    '/get',
    {
      schema: {
        body: GetRequest,
        response: {
          200: GetResponse,
          ...ErrorResponseObject,
        },
      },
    },
    async (req, res) => {
      const { address, key, namespace, pubkey } = req.body

      try {
        if (key.includes('/'))
          return res
            .status(400)
            .send({ error: `Key cannot include "/" character.` })

        const rawAddress = fromBech32(address).data
        const hexAddress = Buffer.from(rawAddress).toString('hex')

        const passkey = await retrieveKeyByAddress(hexAddress)
        if (!passkey)
          return res
            .status(404)
            .send({ error: 'Could not find passkey for specified address.' })

        const compositeKey = namespace ? `${namespace}/${key}` : key
        const entry = await retrieveData(passkey.pubkey, compositeKey)

        if (!entry)
          return res
            .status(404)
            .send({ error: 'Could not find entry for this address and key.' })

        const symmetricKeys: SymmKeyType[] = JSON.parse(
          Buffer.from(entry.symmkeys, 'base64').toString()
        )

        const symmetricKey = symmetricKeys.find(
          (symmetricKey) => symmetricKey.recipient === pubkey
        )

        if (!symmetricKey)
          return res.status(404).send({
            error:
              'Could not find symmetric key for this address. You may not be authorized to access this data.',
          })

        return res
          .status(200)
          .send({ symmetricKey, cipherText: entry.ciphertext, symmetricKeys })
      } catch (e) {
        return res.status(500).send({ error: (e as Error).message })
      }
    }
  )

  fastify.post<{
    Body: SetRequestType
    Reply: SetResponseType | ErrorResponseType
  }>(
    '/set',
    {
      schema: {
        body: SetRequest,
        response: {
          200: SetResponse,
          ...ErrorResponseObject,
        },
      },
    },
    async (req, res) => {
      const {
        publicKey,
        signature,
        key,
        namespace,
        symmetricKeys,
        cipherText,
      } = req.body

      try {
        const passkey = await retrieveKeyByPubkey(publicKey)
        if (!passkey)
          return res
            .status(404)
            .send({ error: 'Could not find passkey for specified public key.' })

        const verified = await verifySignature(
          publicKey,
          signature,
          passkey.address
        )

        if (!verified)
          return res.status(401).send({
            error: 'Invalid signature, could not verify identity.',
          })

        if (key.includes('/'))
          return res
            .status(400)
            .send({ error: `Key cannot include "/" character.` })

        const compositeKey = namespace ? `${namespace}/${key}` : key

        const symmKeysObject = Buffer.from(
          JSON.stringify(symmetricKeys)
        ).toString('base64')

        await storeData(publicKey, compositeKey, symmKeysObject, cipherText)

        return res
          .status(200)
          .send({ hexAddress: passkey.address, key: compositeKey })
      } catch (e) {
        return res.status(500).send({ error: (e as Error).message })
      }
    }
  )

  done()
}
