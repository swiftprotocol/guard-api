import { type Static } from '@sinclair/typebox';
export declare const GetRequest: import("@sinclair/typebox").TObject<{
    address: import("@sinclair/typebox").TString;
    key: import("@sinclair/typebox").TString;
    pubkey: import("@sinclair/typebox").TString;
    namespace: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export type GetRequestType = Static<typeof GetRequest>;
export declare const GetResponse: import("@sinclair/typebox").TObject<{
    symmetricKey: import("@sinclair/typebox").TObject<{
        recipient: import("@sinclair/typebox").TString;
        key: import("@sinclair/typebox").TString;
        iv: import("@sinclair/typebox").TString;
        encryptedPrivateKey: import("@sinclair/typebox").TString;
    }>;
    cipherText: import("@sinclair/typebox").TString;
    symmetricKeys: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        recipient: import("@sinclair/typebox").TString;
        key: import("@sinclair/typebox").TString;
        iv: import("@sinclair/typebox").TString;
        encryptedPrivateKey: import("@sinclair/typebox").TString;
    }>>;
}>;
export type GetResponseType = Static<typeof GetResponse>;
export declare const SetRequest: import("@sinclair/typebox").TObject<{
    key: import("@sinclair/typebox").TString;
    namespace: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    symmetricKeys: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        recipient: import("@sinclair/typebox").TString;
        key: import("@sinclair/typebox").TString;
        iv: import("@sinclair/typebox").TString;
        encryptedPrivateKey: import("@sinclair/typebox").TString;
    }>>;
    cipherText: import("@sinclair/typebox").TString;
    signature: import("@sinclair/typebox").TString;
    pubkey: import("@sinclair/typebox").TString;
}>;
export type SetRequestType = Static<typeof SetRequest>;
export declare const SetResponse: import("@sinclair/typebox").TObject<{
    hexAddress: import("@sinclair/typebox").TString;
    key: import("@sinclair/typebox").TString;
}>;
export type SetResponseType = Static<typeof SetResponse>;
