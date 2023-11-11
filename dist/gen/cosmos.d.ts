import { Static } from '@sinclair/typebox';
export declare enum EnumBroadcastMode {
    Block = "block",
    Sync = "sync",
    Async = "async"
}
export type BroadcastMode = Static<typeof BroadcastMode>;
export declare const BroadcastMode: import("@sinclair/typebox").TEnum<typeof EnumBroadcastMode>;
export type Coin = Static<typeof Coin>;
export declare const Coin: import("@sinclair/typebox").TObject<{
    denom: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TString>;
    amount: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TString>;
}>;
export type StdFee = Static<typeof StdFee>;
export declare const StdFee: import("@sinclair/typebox").TObject<{
    amount: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        denom: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TString>;
        amount: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TString>;
    }>>>>;
    gas: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TString>;
    payer: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>>;
    granter: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>>;
    feePayer: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>>;
}>;
export type Msg = Static<typeof Msg>;
export declare const Msg: import("@sinclair/typebox").TObject<{
    type: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TString>;
    value: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TAny>;
}>;
export type StdSignDoc = Static<typeof StdSignDoc>;
export declare const StdSignDoc: import("@sinclair/typebox").TObject<{
    chain_id: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TString>;
    account_number: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TString>;
    sequence: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TString>;
    timeout_height: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>>;
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
    msgs: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        type: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TString>;
        value: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TAny>;
    }>>>>;
    memo: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TString>;
}>;
export type PubKey = Static<typeof PubKey>;
export declare const PubKey: import("@sinclair/typebox").TObject<{
    type: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TString>;
    value: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TString>;
}>;
export type StdSignature = Static<typeof StdSignature>;
export declare const StdSignature: import("@sinclair/typebox").TObject<{
    pub_key: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TObject<{
        type: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TString>;
        value: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TString>;
    }>>;
    signature: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TString>;
}>;
export type StdTx = Static<typeof StdTx>;
export declare const StdTx: import("@sinclair/typebox").TObject<{
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
export type AminoSignResponse = Static<typeof AminoSignResponse>;
export declare const AminoSignResponse: import("@sinclair/typebox").TObject<{
    signed: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TObject<{
        chain_id: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TString>;
        account_number: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TString>;
        sequence: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TString>;
        timeout_height: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>>;
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
        msgs: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            type: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TString>;
            value: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TAny>;
        }>>>>;
        memo: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TString>;
    }>>;
    signature: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TObject<{
        pub_key: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TObject<{
            type: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TString>;
            value: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TString>;
        }>>;
        signature: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TString>;
    }>>;
}>;
export type SignDoc = Static<typeof SignDoc>;
export declare const SignDoc: import("@sinclair/typebox").TObject<{
    bodyBytes: import("@sinclair/typebox").TUint8Array;
    authInfoBytes: import("@sinclair/typebox").TUint8Array;
    chainId: import("@sinclair/typebox").TString;
    accountNumber: import("@sinclair/typebox").TNumber;
}>;
export type Algo = Static<typeof Algo>;
export declare const Algo: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"secp256k1">, import("@sinclair/typebox").TLiteral<"ed25519">, import("@sinclair/typebox").TLiteral<"sr25519">]>;
export type AccountData = Static<typeof AccountData>;
export declare const AccountData: import("@sinclair/typebox").TObject<{
    address: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TString>;
    algo: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"secp256k1">, import("@sinclair/typebox").TLiteral<"ed25519">, import("@sinclair/typebox").TLiteral<"sr25519">]>>;
    pubkey: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TUint8Array>;
}>;
export type DirectSignResponse = Static<typeof DirectSignResponse>;
export declare const DirectSignResponse: import("@sinclair/typebox").TObject<{
    signed: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TObject<{
        bodyBytes: import("@sinclair/typebox").TUint8Array;
        authInfoBytes: import("@sinclair/typebox").TUint8Array;
        chainId: import("@sinclair/typebox").TString;
        accountNumber: import("@sinclair/typebox").TNumber;
    }>>;
    signature: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TObject<{
        pub_key: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TObject<{
            type: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TString>;
            value: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TString>;
        }>>;
        signature: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TString>;
    }>>;
}>;
export type OfflineDirectSigner = Static<typeof OfflineDirectSigner>;
export declare const OfflineDirectSigner: import("@sinclair/typebox").TObject<{
    getAccounts: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TFunction<[], import("@sinclair/typebox").TPromise<import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        address: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TString>;
        algo: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"secp256k1">, import("@sinclair/typebox").TLiteral<"ed25519">, import("@sinclair/typebox").TLiteral<"sr25519">]>>;
        pubkey: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TUint8Array>;
    }>>>>>>;
    signDirect: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TFunction<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TObject<{
        bodyBytes: import("@sinclair/typebox").TUint8Array;
        authInfoBytes: import("@sinclair/typebox").TUint8Array;
        chainId: import("@sinclair/typebox").TString;
        accountNumber: import("@sinclair/typebox").TNumber;
    }>], import("@sinclair/typebox").TPromise<import("@sinclair/typebox").TObject<{
        signed: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TObject<{
            bodyBytes: import("@sinclair/typebox").TUint8Array;
            authInfoBytes: import("@sinclair/typebox").TUint8Array;
            chainId: import("@sinclair/typebox").TString;
            accountNumber: import("@sinclair/typebox").TNumber;
        }>>;
        signature: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TObject<{
            pub_key: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TObject<{
                type: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TString>;
                value: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TString>;
            }>>;
            signature: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TString>;
        }>>;
    }>>>>;
}>;
export type OfflineAminoSigner = Static<typeof OfflineAminoSigner>;
export declare const OfflineAminoSigner: import("@sinclair/typebox").TObject<{
    getAccounts: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TFunction<[], import("@sinclair/typebox").TPromise<import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        address: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TString>;
        algo: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"secp256k1">, import("@sinclair/typebox").TLiteral<"ed25519">, import("@sinclair/typebox").TLiteral<"sr25519">]>>;
        pubkey: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TUint8Array>;
    }>>>>>>;
    signAmino: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TFunction<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TObject<{
        chain_id: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TString>;
        account_number: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TString>;
        sequence: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TString>;
        timeout_height: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>>;
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
        msgs: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            type: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TString>;
            value: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TAny>;
        }>>>>;
        memo: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TString>;
    }>], import("@sinclair/typebox").TPromise<import("@sinclair/typebox").TObject<{
        signed: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TObject<{
            chain_id: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TString>;
            account_number: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TString>;
            sequence: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TString>;
            timeout_height: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>>;
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
            msgs: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
                type: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TString>;
                value: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TAny>;
            }>>>>;
            memo: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TString>;
        }>>;
        signature: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TObject<{
            pub_key: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TObject<{
                type: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TString>;
                value: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TString>;
            }>>;
            signature: import("@sinclair/typebox").TReadonly<import("@sinclair/typebox").TString>;
        }>>;
    }>>>>;
}>;
