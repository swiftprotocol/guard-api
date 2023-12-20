import { Type } from '@sinclair/typebox';
export const Client = Type.Object({
    pubkey: Type.String(),
    username: Type.String(),
});
export const ClientsResponse = Type.Object({
    clients: Type.Array(Client),
});
export const Registration = Type.Object({
    address: Type.String(),
    username: Type.String(),
});
export const RegistrationRequest = Type.Object({
    address: Type.String(),
});
export const RegistrationResponse = Type.Object({
    registration: Registration,
});
export const RegisterRequest = Type.Object({
    walletSignature: Type.String(),
    username: Type.String(),
});
export const RegisterResponse = Type.Object({
    success: Type.Boolean(),
});
//# sourceMappingURL=types.js.map