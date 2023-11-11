import { Type, type Static } from '@sinclair/typebox'
import { CredentialKey } from '../../gen/auth.js'
import { StdTx } from '../../gen/cosmos.js'

export const GetRequest = Type.Object({
  address: Type.String(),
})

export type GetRequestType = Static<typeof GetRequest>

export const GetResponse = Type.Object({
  hexAddress: Type.String(),
  pubkey: Type.String(),
  passkey: Type.String(),
})

export type GetResponseType = Static<typeof GetResponse>

export const SetRequest = Type.Object({
  walletSignature: StdTx,
  signature: Type.String(),
  publicKey: Type.String(),
  credential: CredentialKey,
})

export type SetRequestType = Static<typeof SetRequest>

export const SetResponse = Type.Object({
  hexAddress: Type.String(),
  credential: CredentialKey,
})

export type SetResponseType = Static<typeof SetResponse>
