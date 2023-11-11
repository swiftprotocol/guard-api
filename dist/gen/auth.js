import { Type } from '@sinclair/typebox';
export const AuthType = Type.Union([
    Type.Literal('auto'),
    Type.Literal('local'),
    Type.Literal('extern'),
    Type.Literal('roaming'),
    Type.Literal('both'),
]);
export const NumAlgo = Type.Union([Type.Literal(-7), Type.Literal(-257)]);
export const NamedAlgo = Type.Union([
    Type.Literal('RS256'),
    Type.Literal('ES256'),
]);
export const ClientInfo = Type.Object({
    type: Type.Union([
        Type.Literal('webauthn.create'),
        Type.Literal('webauthn.get'),
    ]),
    challenge: Type.String(),
    origin: Type.String(),
    crossOrigin: Type.Boolean(),
    tokenBindingId: Type.Optional(Type.Object({
        id: Type.String(),
        status: Type.String(),
    })),
    extensions: Type.Optional(Type.Any()),
});
export const AuthenticatorInfo = Type.Object({
    rpIdHash: Type.String(),
    flags: Type.Object({
        userPresent: Type.Boolean(),
        userVerified: Type.Boolean(),
        backupEligibility: Type.Boolean(),
        backupState: Type.Boolean(),
        attestedData: Type.Boolean(),
        extensionsIncluded: Type.Boolean(),
    }),
    counter: Type.Number(),
    aaguid: Type.String(),
    name: Type.String(),
});
export const AuthenticationEncoded = Type.Object({
    credentialId: Type.String(),
    authenticatorData: Type.String(),
    clientData: Type.String(),
    signature: Type.String(),
    blob: Type.String(),
});
export const AuthenticationParsed = Type.Object({
    credentialId: Type.String(),
    authenticator: AuthenticatorInfo,
    client: ClientInfo,
    signature: Type.String(),
});
export const CredentialKey = Type.Object({
    id: Type.String(),
    publicKey: Type.String(),
    algorithm: Type.Union([Type.Literal('RS256'), Type.Literal('ES256')]),
});
export const RegistrationEncoded = Type.Object({
    username: Type.String(),
    credential: CredentialKey,
    authenticatorData: Type.String(),
    clientData: Type.String(),
    attestationData: Type.Optional(Type.String()),
});
export const RegistrationParsed = Type.Object({
    username: Type.String(),
    credential: Type.Object({
        id: Type.String(),
        publicKey: Type.String(),
        algorithm: Type.Union([Type.Literal('RS256'), Type.Literal('ES256')]),
    }),
    authenticator: AuthenticatorInfo,
    client: ClientInfo,
    attestation: Type.Optional(Type.Any()),
});
//# sourceMappingURL=auth.js.map