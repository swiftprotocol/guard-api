import { type Static } from '@sinclair/typebox';
export declare const ServerToClientEvents: import("@sinclair/typebox").TObject<{
    chatMsgFromServer: import("@sinclair/typebox").TFunction<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString, import("@sinclair/typebox").TString], import("@sinclair/typebox").TVoid>;
    notification: import("@sinclair/typebox").TFunction<[import("@sinclair/typebox").TObject<{
        title: import("@sinclair/typebox").TString;
        body: import("@sinclair/typebox").TString;
        icon: import("@sinclair/typebox").TString;
    }>], import("@sinclair/typebox").TVoid>;
    healthcheck: import("@sinclair/typebox").TFunction<[], import("@sinclair/typebox").TVoid>;
}>;
export type ServerToClientEventsType = Static<typeof ServerToClientEvents>;
export declare const ClientToServerEvents: import("@sinclair/typebox").TObject<{
    chatMsgFromClient: import("@sinclair/typebox").TFunction<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TString], import("@sinclair/typebox").TVoid>;
    healthcheck: import("@sinclair/typebox").TFunction<[], import("@sinclair/typebox").TVoid>;
}>;
export type ClientToServerEventsType = Static<typeof ClientToServerEvents>;
export declare const InterServerEvents: import("@sinclair/typebox").TObject<{
    ping: import("@sinclair/typebox").TFunction<[], import("@sinclair/typebox").TVoid>;
}>;
export type InterServerEventsType = Static<typeof InterServerEvents>;
export declare const SocketData: import("@sinclair/typebox").TObject<{
    pubkey: import("@sinclair/typebox").TString;
    app: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    signature: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    username: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export type SocketDataType = Static<typeof SocketData>;
