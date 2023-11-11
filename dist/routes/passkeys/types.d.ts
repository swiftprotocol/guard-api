import { type Static } from '@sinclair/typebox';
export declare const GetRequest: import("@sinclair/typebox").TObject<{
    address: import("@sinclair/typebox").TString;
}>;
export type GetRequestType = Static<typeof GetRequest>;
export declare const GetResponse: import("@sinclair/typebox").TObject<{
    hexAddress: import("@sinclair/typebox").TString;
    pubkey: import("@sinclair/typebox").TString;
    passkey: import("@sinclair/typebox").TString;
}>;
export type GetResponseType = Static<typeof GetResponse>;
export declare const SetRequest: import("@sinclair/typebox").TObject<{
    walletSignature: import("@sinclair/typebox").TObject<{
        msg: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            type: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TString>;
            value: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TAny>;
        }>>>>;
        fee: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TObject<{
            amount: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
                denom: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TString>;
                amount: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TString>;
            }>>>>;
            gas: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TString>;
            payer: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>>;
            granter: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>>;
            feePayer: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>>;
        }>>;
        signatures: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            pub_key: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TObject<{
                type: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TString>;
                value: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TString>;
            }>>;
            signature: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TString>;
        }>>>>;
        memo: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TString>;
    }>;
    signature: import("@sinclair/typebox").TString;
    publicKey: import("@sinclair/typebox").TString;
    credential: import("@sinclair/typebox").TObject<{
        id: import("@sinclair/typebox").TString;
        publicKey: import("@sinclair/typebox").TString;
        algorithm: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"RS256">, import("@sinclair/typebox").TLiteral<"ES256">]>;
    }>;
}>;
export type SetRequestType = Static<typeof SetRequest>;
export declare const SetResponse: import("@sinclair/typebox").TObject<{
    hexAddress: import("@sinclair/typebox").TString;
    credential: import("@sinclair/typebox").TObject<{
        id: import("@sinclair/typebox").TString;
        publicKey: import("@sinclair/typebox").TString;
        algorithm: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"RS256">, import("@sinclair/typebox").TLiteral<"ES256">]>;
    }>;
}>;
export type SetResponseType = Static<typeof SetResponse>;
