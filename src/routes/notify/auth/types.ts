import { Type, type Static } from '@sinclair/typebox'

export const GetRequest = Type.Object({
  pubkey: Type.String(),
})

export type GetRequestType = Static<typeof GetRequest>

export const GetResponse = Type.Object({
  authorizations: Type.Array(Type.String()),
})

export type GetResponseType = Static<typeof GetResponse>

export const SetRequest = Type.Object({
  signature: Type.String(),
  pubkey: Type.String(),
  authorizations: Type.Array(Type.String()),
})

export type SetRequestType = Static<typeof SetRequest>

export const SetResponse = Type.Object({
  authorizations: Type.Array(Type.String()),
})

export type SetResponseType = Static<typeof SetResponse>
