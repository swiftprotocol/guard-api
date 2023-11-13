import type { CredentialKey } from '@swiftprotocol/auth/types.js'
import { getPostgresPool } from '../helpers.js'

interface RetrieveKeyReturnType {
  passkey_id: string
  pubkey: string
  address: string
}

export async function retrieveKeyByAddress(
  hexAddress: string
): Promise<RetrieveKeyReturnType | undefined> {
  const sql = getPostgresPool()
  const client = await sql.connect()

  const data = await client
    .query(
      `SELECT pubkey, address, passkey_id FROM passkeys WHERE address = $1`,
      [hexAddress]
    )
    .catch((err) => {
      throw Error(err.stack)
    })

  if (!data.rowCount || data.rowCount < 1) {
    return undefined
  }

  const response = data.rows[0]

  client.release()

  return response
}

export async function retrieveKeyByPubkey(
  pubkey: string
): Promise<RetrieveKeyReturnType | undefined> {
  const sql = getPostgresPool()
  const client = await sql.connect()

  const data = await client
    .query(
      `SELECT pubkey, address, passkey_id FROM passkeys WHERE pubkey = $1`,
      [pubkey]
    )
    .catch((err) => {
      throw Error(err.stack)
    })

  if (!data.rowCount || data.rowCount < 1) {
    return undefined
  }

  const response = data.rows[0]

  client.release()

  return response
}

export async function storeKey(
  publicKey: string,
  hexAddress: string,
  credential: CredentialKey
): Promise<void> {
  const sql = getPostgresPool()
  const client = await sql.connect()

  await client
    .query(
      `INSERT INTO passkeys (pubkey, address, passkey_id, passkey_pub, passkey_algo) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (address) DO UPDATE SET pubkey = EXCLUDED.pubkey, passkey_id = EXCLUDED.passkey_id, passkey_pub = EXCLUDED.passkey_pub, passkey_algo = EXCLUDED.passkey_algo`,
      [
        publicKey,
        hexAddress,
        credential.id,
        credential.publicKey,
        credential.algorithm,
      ]
    )
    .catch((err) => {
      throw Error(err.stack)
    })

  client.release()
}
