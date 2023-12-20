import { Type } from '@sinclair/typebox';
// @TODO
export const EmailRequest = Type.Object({});
// @TODO
export const EmailResponse = Type.Object({
    message: Type.String(),
});
export const PushNotification = Type.Object({
    title: Type.String(),
    body: Type.String(),
    icon: Type.String(),
});
export const PushRequest = Type.Object({
    recipientHexAddress: Type.String(),
    pubkey: Type.String(),
    signature: Type.String(),
    notification: PushNotification,
});
export const PushResponse = Type.Object({
    delivered: Type.Boolean(),
});
//# sourceMappingURL=types.js.map