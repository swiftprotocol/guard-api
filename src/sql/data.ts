import { getPostgresPool } from '../helpers.js'

interface RetrieveDataReturnType {
  owner: string
  key: string
  symmkeys: string
  ciphertext: string
}

export async function retrieveData(
  owner: string,
  key: string
): Promise<RetrieveDataReturnType | undefined> {
  const sql = getPostgresPool()
  const client = await sql.connect()

  const data = await client
    .query(`SELECT * FROM data WHERE owner = $1 AND key = $2`, [owner, key])
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

export async function storeData(
  owner: string,
  key: string,
  symmkeys: string,
  ciphertext: string
): Promise<void> {
  const sql = getPostgresPool()
  const client = await sql.connect()

  await client
    .query(
      `INSERT INTO data (owner, key, symmkeys, ciphertext) VALUES ($1, $2, $3, $4) ON CONFLICT (owner, key) DO UPDATE SET symmkeys = EXCLUDED.symmkeys, ciphertext = EXCLUDED.ciphertext`,
      [owner, key, symmkeys, ciphertext]
    )
    .catch((err) => {
      throw Error(err.stack)
    })

  client.release()
}

export async function removeAllDataForOwner(owner: string): Promise<void> {
  const sql = getPostgresPool()
  const client = await sql.connect()

  await client
    .query(`DELETE FROM data WHERE owner = $1`, [owner])
    .catch((err) => {
      throw Error(err.stack)
    })

  client.release()
}
