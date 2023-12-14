import { Type, type Static } from '@sinclair/typebox'

// @TODO
export const EmailRequest = Type.Object({})

export type EmailRequestType = Static<typeof EmailRequest>

// @TODO
export const EmailResponse = Type.Object({
  message: Type.String(),
})

export type EmailResponseType = Static<typeof EmailResponse>

export const PushNotification = Type.Object({
  title: Type.String(),
  body: Type.String(),
  icon: Type.String(),
})

export type PushNotificationType = Static<typeof PushNotification>

export const PushRequest = Type.Object({
  recipientHexAddress: Type.String(),
  pubkey: Type.String(),
  signature: Type.String(),
  notification: PushNotification,
})

export type PushRequestType = Static<typeof PushRequest>

export const PushResponse = Type.Object({
  delivered: Type.Boolean(),
})

export type PushResponseType = Static<typeof PushResponse>
