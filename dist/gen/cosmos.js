import { Type } from '@sinclair/typebox';
export var EnumBroadcastMode;
(function (EnumBroadcastMode) {
    EnumBroadcastMode["Block"] = "block";
    EnumBroadcastMode["Sync"] = "sync";
    EnumBroadcastMode["Async"] = "async";
})(EnumBroadcastMode || (EnumBroadcastMode = {}));
export const BroadcastMode = Type.Enum(EnumBroadcastMode);
export const Coin = Type.Object({
    denom: Type.Readonly(Type.String()),
    amount: Type.Readonly(Type.String()),
});
export const StdFee = Type.Object({
    amount: Type.Readonly(Type.Readonly(Type.Array(Coin))),
    gas: Type.Readonly(Type.String()),
    payer: Type.ReadonlyOptional(Type.String()),
    granter: Type.ReadonlyOptional(Type.String()),
    feePayer: Type.ReadonlyOptional(Type.String()),
});
export const Msg = Type.Object({
    type: Type.Readonly(Type.String()),
    value: Type.Readonly(Type.Any()),
});
export const StdSignDoc = Type.Object({
    chain_id: Type.Readonly(Type.String()),
    account_number: Type.Readonly(Type.String()),
    sequence: Type.Readonly(Type.String()),
    timeout_height: Type.ReadonlyOptional(Type.String()),
    fee: Type.Readonly(StdFee),
    msgs: Type.Readonly(Type.Readonly(Type.Array(Msg))),
    memo: Type.Readonly(Type.String()),
});
export const PubKey = Type.Object({
    type: Type.Readonly(Type.String()),
    value: Type.Readonly(Type.String()),
});
export const StdSignature = Type.Object({
    pub_key: Type.Readonly(PubKey),
    signature: Type.Readonly(Type.String()),
});
export const StdTx = Type.Object({
    msg: Type.Readonly(Type.Readonly(Type.Array(Msg))),
    fee: Type.Readonly(StdFee),
    signatures: Type.Readonly(Type.Readonly(Type.Array(StdSignature))),
    memo: Type.Readonly(Type.String()),
});
export const AminoSignResponse = Type.Object({
    signed: Type.Readonly(StdSignDoc),
    signature: Type.Readonly(StdSignature),
});
export const SignDoc = Type.Object({
    bodyBytes: Type.Uint8Array(),
    authInfoBytes: Type.Uint8Array(),
    chainId: Type.String(),
    accountNumber: Type.Number(),
});
export const Algo = Type.Union([Type.Literal('secp256k1'), Type.Literal('ed25519'), Type.Literal('sr25519')], { 'cosmjs/launchpad': 'but those might diverge in the future.' });
export const AccountData = Type.Object({
    address: Type.Readonly(Type.String()),
    algo: Type.Readonly(Algo),
    pubkey: Type.Readonly(Type.Uint8Array()),
}, { 'cosmjs/launchpad': 'but those might diverge in the future.' });
export const DirectSignResponse = Type.Object({
    signed: Type.Readonly(SignDoc),
    signature: Type.Readonly(StdSignature),
});
export const OfflineDirectSigner = Type.Object({
    getAccounts: Type.Readonly(Type.Function([], Type.Promise(Type.Readonly(Type.Array(AccountData))))),
    signDirect: Type.Readonly(Type.Function([Type.String(), SignDoc], Type.Promise(DirectSignResponse))),
});
export const OfflineAminoSigner = Type.Object({
    getAccounts: Type.Readonly(Type.Function([], Type.Promise(Type.Readonly(Type.Array(AccountData))))),
    signAmino: Type.Readonly(Type.Function([Type.String(), StdSignDoc], Type.Promise(AminoSignResponse), { param: 'signDoc The content that should be signed' })),
});
//# sourceMappingURL=cosmos.js.map