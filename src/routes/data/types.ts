import { Type, type Static } from '@sinclair/typebox'
import { StdTx } from '../../gen/cosmos.js'
import { SymmKey } from '../../types.js'

export const GetRequest = Type.Object({
  address: Type.String(),
  key: Type.String(),
  pubkey: Type.String(),
  namespace: Type.Optional(Type.String()),
})

export type GetRequestType = Static<typeof GetRequest>

export const GetResponse = Type.Object({
  symmetricKey: SymmKey,
  cipherText: Type.String(),
  symmetricKeys: Type.Array(SymmKey),
})

export type GetResponseType = Static<typeof GetResponse>

export const SetRequest = Type.Object({
  key: Type.String(),
  namespace: Type.Optional(Type.String()),
  symmetricKeys: Type.Array(SymmKey),
  cipherText: Type.String(),
  signature: StdTx,
})

export type SetRequestType = Static<typeof SetRequest>

export const SetResponse = Type.Object({
  hexAddress: Type.String(),
  key: Type.String(),
})

export type SetResponseType = Static<typeof SetResponse>
