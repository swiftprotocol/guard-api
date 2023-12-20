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

export const Registration = Type.Object({
  address: Type.String(),
  username: Type.String(),
})

export type RegistrationType = Static<typeof Registration>

export const RegistrationRequest = Type.Object({
  address: Type.String(),
})

export type RegistrationRequestType = Static<typeof RegistrationRequest>

export const RegistrationResponse = Type.Object({
  registration: Registration,
})

export type RegistrationResponseType = Static<typeof RegistrationResponse>

export const RegisterRequest = Type.Object({
  walletSignature: Type.String(),
  username: Type.String(),
})

export type RegisterRequestType = Static<typeof RegisterRequest>

export const RegisterResponse = Type.Object({
  success: Type.Boolean(),
})

export type RegisterResponseType = Static<typeof RegisterResponse>
