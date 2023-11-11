import { Type } from '@sinclair/typebox';
export const SymmKey = Type.Object({
    recipient: Type.String(),
    key: Type.String(),
    iv: Type.String(),
    encryptedPrivateKey: Type.String(),
});
export const ErrorResponse = Type.Object({
    error: Type.String(),
});
export const ErrorResponseObject = {
    400: ErrorResponse,
    401: ErrorResponse,
    404: ErrorResponse,
    422: ErrorResponse,
    500: ErrorResponse,
};
export const SwaggerDefinitions = {};
//# sourceMappingURL=types.js.map