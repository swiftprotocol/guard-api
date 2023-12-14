import { Type } from '@sinclair/typebox';
export const SubscribeRequest = Type.Object({
    app: Type.String(),
    pubkey: Type.String(),
    signature: Type.String(),
    subscription: Type.Object({
        endpoint: Type.String(),
        keys: Type.Object({
            p256dh: Type.String(),
            auth: Type.String(),
        }),
    }),
});
export const SubscribeResponse = Type.Object({
    pubkey: Type.String(),
});
//# sourceMappingURL=types.js.map