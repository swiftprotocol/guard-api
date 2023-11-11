import { Static } from '@sinclair/typebox';
export type AuthType = Static<typeof AuthType>;
export declare const AuthType: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"auto">, import("@sinclair/typebox").TLiteral<"local">, import("@sinclair/typebox").TLiteral<"extern">, import("@sinclair/typebox").TLiteral<"roaming">, import("@sinclair/typebox").TLiteral<"both">]>;
export type NumAlgo = Static<typeof NumAlgo>;
export declare const NumAlgo: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<-7>, import("@sinclair/typebox").TLiteral<-257>]>;
export type NamedAlgo = Static<typeof NamedAlgo>;
export declare const NamedAlgo: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"RS256">, import("@sinclair/typebox").TLiteral<"ES256">]>;
export type ClientInfo = Static<typeof ClientInfo>;
export declare const ClientInfo: import("@sinclair/typebox").TObject<{
    type: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"webauthn.create">, import("@sinclair/typebox").TLiteral<"webauthn.get">]>;
    challenge: import("@sinclair/typebox").TString;
    origin: import("@sinclair/typebox").TString;
    crossOrigin: import("@sinclair/typebox").TBoolean;
    tokenBindingId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
        id: import("@sinclair/typebox").TString;
        status: import("@sinclair/typebox").TString;
    }>>;
    extensions: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
}>;
export type AuthenticatorInfo = Static<typeof AuthenticatorInfo>;
export declare const AuthenticatorInfo: import("@sinclair/typebox").TObject<{
    rpIdHash: import("@sinclair/typebox").TString;
    flags: import("@sinclair/typebox").TObject<{
        userPresent: import("@sinclair/typebox").TBoolean;
        userVerified: import("@sinclair/typebox").TBoolean;
        backupEligibility: import("@sinclair/typebox").TBoolean;
        backupState: import("@sinclair/typebox").TBoolean;
        attestedData: import("@sinclair/typebox").TBoolean;
        extensionsIncluded: import("@sinclair/typebox").TBoolean;
    }>;
    counter: import("@sinclair/typebox").TNumber;
    aaguid: import("@sinclair/typebox").TString;
    name: import("@sinclair/typebox").TString;
}>;
export type AuthenticationEncoded = Static<typeof AuthenticationEncoded>;
export declare const AuthenticationEncoded: import("@sinclair/typebox").TObject<{
    credentialId: import("@sinclair/typebox").TString;
    authenticatorData: import("@sinclair/typebox").TString;
    clientData: import("@sinclair/typebox").TString;
    signature: import("@sinclair/typebox").TString;
    blob: import("@sinclair/typebox").TString;
}>;
export type AuthenticationParsed = Static<typeof AuthenticationParsed>;
export declare const AuthenticationParsed: import("@sinclair/typebox").TObject<{
    credentialId: import("@sinclair/typebox").TString;
    authenticator: import("@sinclair/typebox").TObject<{
        rpIdHash: import("@sinclair/typebox").TString;
        flags: import("@sinclair/typebox").TObject<{
            userPresent: import("@sinclair/typebox").TBoolean;
            userVerified: import("@sinclair/typebox").TBoolean;
            backupEligibility: import("@sinclair/typebox").TBoolean;
            backupState: import("@sinclair/typebox").TBoolean;
            attestedData: import("@sinclair/typebox").TBoolean;
            extensionsIncluded: import("@sinclair/typebox").TBoolean;
        }>;
        counter: import("@sinclair/typebox").TNumber;
        aaguid: import("@sinclair/typebox").TString;
        name: import("@sinclair/typebox").TString;
    }>;
    client: import("@sinclair/typebox").TObject<{
        type: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"webauthn.create">, import("@sinclair/typebox").TLiteral<"webauthn.get">]>;
        challenge: import("@sinclair/typebox").TString;
        origin: import("@sinclair/typebox").TString;
        crossOrigin: import("@sinclair/typebox").TBoolean;
        tokenBindingId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
            id: import("@sinclair/typebox").TString;
            status: import("@sinclair/typebox").TString;
        }>>;
        extensions: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
    }>;
    signature: import("@sinclair/typebox").TString;
}>;
export type CredentialKey = Static<typeof CredentialKey>;
export declare const CredentialKey: import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TString;
    publicKey: import("@sinclair/typebox").TString;
    algorithm: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"RS256">, import("@sinclair/typebox").TLiteral<"ES256">]>;
}>;
export type RegistrationEncoded = Static<typeof RegistrationEncoded>;
export declare const RegistrationEncoded: import("@sinclair/typebox").TObject<{
    username: import("@sinclair/typebox").TString;
    credential: import("@sinclair/typebox").TObject<{
        id: import("@sinclair/typebox").TString;
        publicKey: import("@sinclair/typebox").TString;
        algorithm: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"RS256">, import("@sinclair/typebox").TLiteral<"ES256">]>;
    }>;
    authenticatorData: import("@sinclair/typebox").TString;
    clientData: import("@sinclair/typebox").TString;
    attestationData: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export type RegistrationParsed = Static<typeof RegistrationParsed>;
export declare const RegistrationParsed: import("@sinclair/typebox").TObject<{
    username: import("@sinclair/typebox").TString;
    credential: import("@sinclair/typebox").TObject<{
        id: import("@sinclair/typebox").TString;
        publicKey: import("@sinclair/typebox").TString;
        algorithm: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"RS256">, import("@sinclair/typebox").TLiteral<"ES256">]>;
    }>;
    authenticator: import("@sinclair/typebox").TObject<{
        rpIdHash: import("@sinclair/typebox").TString;
        flags: import("@sinclair/typebox").TObject<{
            userPresent: import("@sinclair/typebox").TBoolean;
            userVerified: import("@sinclair/typebox").TBoolean;
            backupEligibility: import("@sinclair/typebox").TBoolean;
            backupState: import("@sinclair/typebox").TBoolean;
            attestedData: import("@sinclair/typebox").TBoolean;
            extensionsIncluded: import("@sinclair/typebox").TBoolean;
        }>;
        counter: import("@sinclair/typebox").TNumber;
        aaguid: import("@sinclair/typebox").TString;
        name: import("@sinclair/typebox").TString;
    }>;
    client: import("@sinclair/typebox").TObject<{
        type: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"webauthn.create">, import("@sinclair/typebox").TLiteral<"webauthn.get">]>;
        challenge: import("@sinclair/typebox").TString;
        origin: import("@sinclair/typebox").TString;
        crossOrigin: import("@sinclair/typebox").TBoolean;
        tokenBindingId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
            id: import("@sinclair/typebox").TString;
            status: import("@sinclair/typebox").TString;
        }>>;
        extensions: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
    }>;
    attestation: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
}>;
