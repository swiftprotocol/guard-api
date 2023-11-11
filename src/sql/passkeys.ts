import type { CredentialKey } from '@swiftprotocol/auth/types.js'

export async function retrieveKey(
  hexAddress: string
): Promise<string | undefined> {
  const client = await globalThis.sql.connect()

  const data = await client
    .query(`SELECT passkey_id FROM passkeys WHERE pubkey = $1`, [hexAddress])
    .catch((err) => {
      throw Error(err.stack)
    })

  if (!data.rowCount || data.rowCount < 1) {
    return undefined
  }

  const { passkey_id } = data.rows[0]

  client.release()

  return passkey_id
}

export async function storeKey(
  hexAddress: string,
  credential: CredentialKey
): Promise<void> {
  const client = await globalThis.sql.connect()

  await client
    .query(
      `INSERT INTO passkeys (pubkey, passkey_id, passkey_pub, passkey_algo) VALUES ($1, $2, $3, $4) ON CONFLICT (pubkey) DO UPDATE SET passkey_id = EXCLUDED.passkey_id, passkey_pub = EXCLUDED.passkey_pub, passkey_algo = EXCLUDED.passkey_algo`,
      [hexAddress, credential.id, credential.publicKey, credential.algorithm]
    )
    .catch((err) => {
      throw Error(err.stack)
    })

  client.release()
}
