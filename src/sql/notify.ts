import { getPostgresPool } from '../helpers.js'

interface RetrieveAuthorizationsReturnType {
  pubkey: string
  authorizations: string
}

interface RetrieveSubscriptionReturnType {
  pubkey: string
  app: string
  subscription: string
}

interface RetrieveClientReturnType {
  pubkey: string
  app: string
  socket: string
}

export async function retrieveAuthorizations(
  pubkey: string
): Promise<RetrieveAuthorizationsReturnType | undefined> {
  const sql = getPostgresPool()
  const client = await sql.connect()

  const data = await client
    .query(`SELECT * FROM notify_auth WHERE pubkey = $1`, [pubkey])
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

export async function storeAuthorizations(
  pubkey: string,
  authorizations: string
): Promise<void> {
  const sql = getPostgresPool()
  const client = await sql.connect()

  await client
    .query(
      `INSERT INTO notify_auth (pubkey, authorizations) VALUES ($1, $2) ON CONFLICT (pubkey) DO UPDATE SET authorizations = EXCLUDED.authorizations`,
      [pubkey, authorizations]
    )
    .catch((err) => {
      throw Error(err.stack)
    })

  client.release()
}

export async function retrieveSubscription(
  pubkey: string,
  app: string
): Promise<RetrieveSubscriptionReturnType | undefined> {
  const sql = getPostgresPool()
  const client = await sql.connect()

  const data = await client
    .query(`SELECT * FROM notify_sub WHERE pubkey = $1 AND app = $2`, [
      pubkey,
      app,
    ])
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

export async function storeSubscription(
  pubkey: string,
  app: string,
  subscription: string
): Promise<void> {
  const sql = getPostgresPool()
  const client = await sql.connect()

  await client
    .query(
      `INSERT INTO notify_sub (pubkey, app, subscription) VALUES ($1, $2, $3) ON CONFLICT (pubkey, app) DO UPDATE SET subscription = EXCLUDED.subscription`,
      [pubkey, app, subscription]
    )
    .catch((err) => {
      throw Error(err.stack)
    })

  client.release()
}

export async function retrieveClient(
  pubkey: string,
  app: string
): Promise<RetrieveClientReturnType | undefined> {
  const sql = getPostgresPool()
  const client = await sql.connect()

  const data = await client
    .query(`SELECT * FROM notify_clients WHERE pubkey = $1 AND app = $2`, [
      pubkey,
      app,
    ])
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

export async function addClient(
  pubkey: string,
  app: string,
  socket: string
): Promise<void> {
  const sql = getPostgresPool()
  const client = await sql.connect()

  await client
    .query(
      `INSERT INTO notify_clients (pubkey, app, socket) VALUES ($1, $2, $3) ON CONFLICT (pubkey, app) DO UPDATE SET socket = EXCLUDED.socket`,
      [pubkey, app, socket]
    )
    .catch((err) => {
      throw Error(err.stack)
    })

  client.release()
}

export async function removeClient(pubkey: string, app: string): Promise<void> {
  const sql = getPostgresPool()
  const client = await sql.connect()

  await client
    .query(`DELETE FROM notify_clients WHERE pubkey = $1 AND app = $2`, [
      pubkey,
      app,
    ])
    .catch((err) => {
      throw Error(err.stack)
    })

  client.release()
}
