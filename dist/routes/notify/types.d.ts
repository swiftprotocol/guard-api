import { type Static } from '@sinclair/typebox';
export declare const EmailRequest: import("@sinclair/typebox").TObject<{}>;
export type EmailRequestType = Static<typeof EmailRequest>;
export declare const EmailResponse: import("@sinclair/typebox").TObject<{
    message: import("@sinclair/typebox").TString;
}>;
export type EmailResponseType = Static<typeof EmailResponse>;
export declare const PushRequest: import("@sinclair/typebox").TObject<{
    recipientHexAddress: import("@sinclair/typebox").TString;
    pubkey: import("@sinclair/typebox").TString;
    signature: import("@sinclair/typebox").TString;
    notification: import("@sinclair/typebox").TObject<{
        title: import("@sinclair/typebox").TString;
        body: import("@sinclair/typebox").TString;
        icon: import("@sinclair/typebox").TString;
    }>;
}>;
export type PushRequestType = Static<typeof PushRequest>;
export declare const PushResponse: import("@sinclair/typebox").TObject<{
    delivered: import("@sinclair/typebox").TBoolean;
}>;
export type PushResponseType = Static<typeof PushResponse>;
