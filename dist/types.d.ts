import { type Static } from '@sinclair/typebox';
import { OpenAPIV2 } from 'openapi-types';
export interface RegistrationChecks {
    challenge: string | Function;
    origin: string | Function;
}
export declare const SymmKey: import("@sinclair/typebox").TObject<{
    recipient: import("@sinclair/typebox").TString;
    key: import("@sinclair/typebox").TString;
    iv: import("@sinclair/typebox").TString;
    encryptedPrivateKey: import("@sinclair/typebox").TString;
}>;
export type SymmKeyType = Static<typeof SymmKey>;
export declare const ErrorResponse: import("@sinclair/typebox").TObject<{
    error: import("@sinclair/typebox").TString;
}>;
export type ErrorResponseType = Static<typeof ErrorResponse>;
export declare const ErrorResponseObject: {
    400: import("@sinclair/typebox").TObject<{
        error: import("@sinclair/typebox").TString;
    }>;
    401: import("@sinclair/typebox").TObject<{
        error: import("@sinclair/typebox").TString;
    }>;
    404: import("@sinclair/typebox").TObject<{
        error: import("@sinclair/typebox").TString;
    }>;
    422: import("@sinclair/typebox").TObject<{
        error: import("@sinclair/typebox").TString;
    }>;
    500: import("@sinclair/typebox").TObject<{
        error: import("@sinclair/typebox").TString;
    }>;
};
export declare const SwaggerDefinitions: OpenAPIV2.DefinitionsObject;
