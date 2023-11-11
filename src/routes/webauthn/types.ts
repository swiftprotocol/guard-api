import { Type, type Static } from '@sinclair/typebox'
import { RegistrationEncoded, RegistrationParsed } from '../../gen/auth.js'

export const ChallengeRequest = Type.Object({
  pubkey: Type.String(),
})

export type ChallengeRequestType = Static<typeof ChallengeRequest>

export const ChallengeResponse = Type.Object({
  hexAddress: Type.String(),
  challenge: Type.String({ minLength: 16 }),
})

export type ChallengeResponseType = Static<typeof ChallengeResponse>

export const VerifyRequest = Type.Object({
  pubkey: Type.String(),
  registration: RegistrationEncoded,
})

export type VerifyRequestType = Static<typeof VerifyRequest>

export const VerifyResponse = Type.Object({
  hexAddress: Type.String(),
  credential: RegistrationParsed.credential,
  client: RegistrationParsed.client,
})

export type VerifyResponseType = Static<typeof VerifyResponse>
