import { type Static } from '@sinclair/typebox';
export declare const GetRequest: import("@sinclair/typebox").TObject<{
    pubkey: import("@sinclair/typebox").TString;
}>;
export type GetRequestType = Static<typeof GetRequest>;
export declare const GetResponse: import("@sinclair/typebox").TObject<{
    authorizations: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
}>;
export type GetResponseType = Static<typeof GetResponse>;
export declare const SetRequest: import("@sinclair/typebox").TObject<{
    signature: import("@sinclair/typebox").TString;
    pubkey: import("@sinclair/typebox").TString;
    authorizations: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
}>;
export type SetRequestType = Static<typeof SetRequest>;
export declare const SetResponse: import("@sinclair/typebox").TObject<{
    authorizations: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
}>;
export type SetResponseType = Static<typeof SetResponse>;
