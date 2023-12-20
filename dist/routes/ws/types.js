import { Type } from '@sinclair/typebox';
import { PushNotification } from '../notify/types.js';
export const ServerToClientEvents = Type.Object({
    chatMsgFromServer: Type.Function([Type.String(), Type.String(), Type.String()], Type.Void()),
    notification: Type.Function([PushNotification], Type.Void()),
    healthcheck: Type.Function([], Type.Void()),
});
export const ClientToServerEvents = Type.Object({
    chatMsgFromClient: Type.Function([Type.String(), Type.String()], Type.Void()),
    healthcheck: Type.Function([], Type.Void()),
});
export const InterServerEvents = Type.Object({
    ping: Type.Function([], Type.Void()),
});
export const SocketData = Type.Object({
    pubkey: Type.String(),
    app: Type.Optional(Type.String()),
    signature: Type.Optional(Type.String()),
    username: Type.Optional(Type.String()),
});
//# sourceMappingURL=types.js.map