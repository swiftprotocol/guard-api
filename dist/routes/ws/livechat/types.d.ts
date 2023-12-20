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
export declare const Registration: import("@sinclair/typebox").TObject<{
    address: import("@sinclair/typebox").TString;
    username: import("@sinclair/typebox").TString;
}>;
export type RegistrationType = Static<typeof Registration>;
export declare const RegistrationRequest: import("@sinclair/typebox").TObject<{
    address: import("@sinclair/typebox").TString;
}>;
export type RegistrationRequestType = Static<typeof RegistrationRequest>;
export declare const RegistrationResponse: import("@sinclair/typebox").TObject<{
    registration: import("@sinclair/typebox").TObject<{
        address: import("@sinclair/typebox").TString;
        username: import("@sinclair/typebox").TString;
    }>;
}>;
export type RegistrationResponseType = Static<typeof RegistrationResponse>;
export declare const RegisterRequest: import("@sinclair/typebox").TObject<{
    walletSignature: import("@sinclair/typebox").TString;
    username: import("@sinclair/typebox").TString;
}>;
export type RegisterRequestType = Static<typeof RegisterRequest>;
export declare const RegisterResponse: import("@sinclair/typebox").TObject<{
    success: import("@sinclair/typebox").TBoolean;
}>;
export type RegisterResponseType = Static<typeof RegisterResponse>;
