import { Type } from '@sinclair/typebox';
export const GetRequest = Type.Object({
    pubkey: Type.String(),
});
export const GetResponse = Type.Object({
    authorizations: Type.Array(Type.String()),
});
export const SetRequest = Type.Object({
    signature: Type.String(),
    pubkey: Type.String(),
    authorizations: Type.Array(Type.String()),
});
export const SetResponse = Type.Object({
    pubkey: Type.String(),
    authorizations: Type.Array(Type.String()),
});
//# sourceMappingURL=types.js.map