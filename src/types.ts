import { Type, type Static } from '@sinclair/typebox'
import { OpenAPIV2 } from 'openapi-types'

export interface RegistrationChecks {
  challenge: string | Function
  origin: string | Function
}

export const SymmKey = Type.Object({
  recipient: Type.String(),
  key: Type.String(),
  iv: Type.String(),
  encryptedPrivateKey: Type.String(),
})

export type SymmKeyType = Static<typeof SymmKey>

export const ErrorResponse = Type.Object({
  error: Type.String(),
})

export type ErrorResponseType = Static<typeof ErrorResponse>

export const ErrorResponseObject = {
  400: ErrorResponse,
  401: ErrorResponse,
  404: ErrorResponse,
  422: ErrorResponse,
  500: ErrorResponse,
}

export const SwaggerDefinitions: OpenAPIV2.DefinitionsObject = {}
