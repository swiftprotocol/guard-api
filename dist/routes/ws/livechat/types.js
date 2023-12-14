import { Type } from '@sinclair/typebox';
export const Client = Type.Object({
    pubkey: Type.String(),
    username: Type.String(),
});
export const ClientsResponse = Type.Object({
    clients: Type.Array(Client),
});
//# sourceMappingURL=types.js.map