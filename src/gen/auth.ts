import { Static, Type } from '@sinclair/typebox'

export type AuthType = Static<typeof AuthType>
export const AuthType = Type.Union([
  Type.Literal('auto'),
  Type.Literal('local'),
  Type.Literal('extern'),
  Type.Literal('roaming'),
  Type.Literal('both'),
])

export type NumAlgo = Static<typeof NumAlgo>
export const NumAlgo = Type.Union([Type.Literal(-7), Type.Literal(-257)])

export type NamedAlgo = Static<typeof NamedAlgo>
export const NamedAlgo = Type.Union([
  Type.Literal('RS256'),
  Type.Literal('ES256'),
])

export type ClientInfo = Static<typeof ClientInfo>
export const ClientInfo = Type.Object({
  type: Type.Union([
    Type.Literal('webauthn.create'),
    Type.Literal('webauthn.get'),
  ]),
  challenge: Type.String(),
  origin: Type.String(),
  crossOrigin: Type.Boolean(),
  tokenBindingId: Type.Optional(
    Type.Object({
      id: Type.String(),
      status: Type.String(),
    })
  ),
  extensions: Type.Optional(Type.Any()),
})

export type AuthenticatorInfo = Static<typeof AuthenticatorInfo>
export const AuthenticatorInfo = Type.Object({
  rpIdHash: Type.String(),
  flags: Type.Object({
    userPresent: Type.Boolean(),
    userVerified: Type.Boolean(),
    backupEligibility: Type.Boolean(),
    backupState: Type.Boolean(),
    attestedData: Type.Boolean(),
    extensionsIncluded: Type.Boolean(),
  }),
  counter: Type.Number(),
  aaguid: Type.String(),
  name: Type.String(),
})

export type AuthenticationEncoded = Static<typeof AuthenticationEncoded>
export const AuthenticationEncoded = Type.Object({
  credentialId: Type.String(),
  authenticatorData: Type.String(),
  clientData: Type.String(),
  signature: Type.String(),
  blob: Type.String(),
})

export type AuthenticationParsed = Static<typeof AuthenticationParsed>
export const AuthenticationParsed = Type.Object({
  credentialId: Type.String(),
  authenticator: AuthenticatorInfo,
  client: ClientInfo,
  signature: Type.String(),
})

export type CredentialKey = Static<typeof CredentialKey>
export const CredentialKey = Type.Object({
  id: Type.String(),
  publicKey: Type.String(),
  algorithm: Type.Union([Type.Literal('RS256'), Type.Literal('ES256')]),
})

export type RegistrationEncoded = Static<typeof RegistrationEncoded>
export const RegistrationEncoded = Type.Object({
  username: Type.String(),
  credential: CredentialKey,
  authenticatorData: Type.String(),
  clientData: Type.String(),
  attestationData: Type.Optional(Type.String()),
})

export type RegistrationParsed = Static<typeof RegistrationParsed>
export const RegistrationParsed = Type.Object({
  username: Type.String(),
  credential: Type.Object({
    id: Type.String(),
    publicKey: Type.String(),
    algorithm: Type.Union([Type.Literal('RS256'), Type.Literal('ES256')]),
  }),
  authenticator: AuthenticatorInfo,
  client: ClientInfo,
  attestation: Type.Optional(Type.Any()),
})
