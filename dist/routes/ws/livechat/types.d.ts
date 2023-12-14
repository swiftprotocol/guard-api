import { type Static } from '@sinclair/typebox';
export declare const Client: import("@sinclair/typebox").TObject<{
    pubkey: import("@sinclair/typebox").TString;
    username: import("@sinclair/typebox").TString;
}>;
export type ClientType = Static<typeof Client>;
export declare const ClientsResponse: import("@sinclair/typebox").TObject<{
    clients: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        pubkey: import("@sinclair/typebox").TString;
        username: import("@sinclair/typebox").TString;
    }>>;
}>;
export type ClientsResponseType = Static<typeof ClientsResponse>;
