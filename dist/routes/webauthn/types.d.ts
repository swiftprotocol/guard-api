import { type Static } from '@sinclair/typebox';
export declare const ChallengeRequest: import("@sinclair/typebox").TObject<{
    address: import("@sinclair/typebox").TString;
}>;
export type ChallengeRequestType = Static<typeof ChallengeRequest>;
export declare const ChallengeResponse: import("@sinclair/typebox").TObject<{
    hexAddress: import("@sinclair/typebox").TString;
    challenge: import("@sinclair/typebox").TString;
}>;
export type ChallengeResponseType = Static<typeof ChallengeResponse>;
export declare const VerifyRequest: import("@sinclair/typebox").TObject<{
    address: import("@sinclair/typebox").TString;
    registration: import("@sinclair/typebox").TObject<{
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
}>;
export type VerifyRequestType = Static<typeof VerifyRequest>;
export declare const VerifyResponse: import("@sinclair/typebox").TObject<{
    hexAddress: import("@sinclair/typebox").TString;
    credential: any;
    client: any;
}>;
export type VerifyResponseType = Static<typeof VerifyResponse>;
