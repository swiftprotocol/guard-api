import { Type, type Static } from '@sinclair/typebox'

export const Client = Type.Object({
  pubkey: Type.String(),
  username: Type.String(),
})

export type ClientType = Static<typeof Client>

export const ClientsResponse = Type.Object({
  clients: Type.Array(Client),
})

export type ClientsResponseType = Static<typeof ClientsResponse>
