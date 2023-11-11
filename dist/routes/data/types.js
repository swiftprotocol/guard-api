import { Type } from '@sinclair/typebox';
import { SymmKey } from '../../types.js';
export const GetRequest = Type.Object({
    address: Type.String(),
    key: Type.String(),
    pubkey: Type.String(),
    namespace: Type.Optional(Type.String()),
});
export const GetResponse = Type.Object({
    symmetricKey: SymmKey,
    cipherText: Type.String(),
    symmetricKeys: Type.Array(SymmKey),
});
export const SetRequest = Type.Object({
    key: Type.String(),
    namespace: Type.Optional(Type.String()),
    symmetricKeys: Type.Array(SymmKey),
    cipherText: Type.String(),
    signature: Type.String(),
    publicKey: Type.String(),
});
export const SetResponse = Type.Object({
    hexAddress: Type.String(),
    key: Type.String(),
});
//# sourceMappingURL=types.js.map