import { type Static } from '@sinclair/typebox';
export declare const SubscribeRequest: import("@sinclair/typebox").TObject<{
    app: import("@sinclair/typebox").TString;
    pubkey: import("@sinclair/typebox").TString;
    signature: import("@sinclair/typebox").TString;
    subscription: import("@sinclair/typebox").TObject<{
        endpoint: import("@sinclair/typebox").TString;
        keys: import("@sinclair/typebox").TObject<{
            p256dh: import("@sinclair/typebox").TString;
            auth: import("@sinclair/typebox").TString;
        }>;
    }>;
}>;
export type SubscribeRequestType = Static<typeof SubscribeRequest>;
export declare const SubscribeResponse: import("@sinclair/typebox").TObject<{
    pubkey: import("@sinclair/typebox").TString;
}>;
export type SubscribeResponseType = Static<typeof SubscribeResponse>;
