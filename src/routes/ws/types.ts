import { Type, type Static } from '@sinclair/typebox'

export const ServerToClientEvents = Type.Object({
  chatMsgFromServer: Type.Function(
    [Type.String(), Type.String(), Type.String()],
    Type.Void()
  ),
  healthcheck: Type.Function([], Type.Void()),
})

export type ServerToClientEventsType = Static<typeof ServerToClientEvents>

export const ClientToServerEvents = Type.Object({
  chatMsgFromClient: Type.Function([Type.String(), Type.String()], Type.Void()),
  healthcheck: Type.Function([], Type.Void()),
})

export type ClientToServerEventsType = Static<typeof ClientToServerEvents>

export const InterServerEvents = Type.Object({
  ping: Type.Function([], Type.Void()),
})

export type InterServerEventsType = Static<typeof InterServerEvents>

export const SocketData = Type.Object({
  pubkey: Type.String(),
  app: Type.Optional(Type.String()),
  signature: Type.Optional(Type.String()),
  username: Type.Optional(Type.String()),
})

export type SocketDataType = Static<typeof SocketData>
