import { Static, Type } from '@sinclair/typebox'

export enum EnumBroadcastMode {
  Block = 'block',
  Sync = 'sync',
  Async = 'async',
}

export type BroadcastMode = Static<typeof BroadcastMode>
export const BroadcastMode = Type.Enum(EnumBroadcastMode)

export type Coin = Static<typeof Coin>
export const Coin = Type.Object({
  denom: Type.Readonly(Type.String()),
  amount: Type.Readonly(Type.String()),
})

export type StdFee = Static<typeof StdFee>
export const StdFee = Type.Object({
  amount: Type.Readonly(Type.Readonly(Type.Array(Coin))),
  gas: Type.Readonly(Type.String()),
  payer: Type.ReadonlyOptional(Type.String()),
  granter: Type.ReadonlyOptional(Type.String()),
  feePayer: Type.ReadonlyOptional(Type.String()),
})

export type Msg = Static<typeof Msg>
export const Msg = Type.Object({
  type: Type.Readonly(Type.String()),
  value: Type.Readonly(Type.Any()),
})

export type StdSignDoc = Static<typeof StdSignDoc>
export const StdSignDoc = Type.Object({
  chain_id: Type.Readonly(Type.String()),
  account_number: Type.Readonly(Type.String()),
  sequence: Type.Readonly(Type.String()),
  timeout_height: Type.ReadonlyOptional(Type.String()),
  fee: Type.Readonly(StdFee),
  msgs: Type.Readonly(Type.Readonly(Type.Array(Msg))),
  memo: Type.Readonly(Type.String()),
})

export type PubKey = Static<typeof PubKey>
export const PubKey = Type.Object({
  type: Type.Readonly(Type.String()),
  value: Type.Readonly(Type.String()),
})

export type StdSignature = Static<typeof StdSignature>
export const StdSignature = Type.Object({
  pub_key: Type.Readonly(PubKey),
  signature: Type.Readonly(Type.String()),
})

export type StdTx = Static<typeof StdTx>
export const StdTx = Type.Object({
  msg: Type.Readonly(Type.Readonly(Type.Array(Msg))),
  fee: Type.Readonly(StdFee),
  signatures: Type.Readonly(Type.Readonly(Type.Array(StdSignature))),
  memo: Type.Readonly(Type.String()),
})

export type AminoSignResponse = Static<typeof AminoSignResponse>
export const AminoSignResponse = Type.Object({
  signed: Type.Readonly(StdSignDoc),
  signature: Type.Readonly(StdSignature),
})

export type SignDoc = Static<typeof SignDoc>
export const SignDoc = Type.Object({
  bodyBytes: Type.Uint8Array(),
  authInfoBytes: Type.Uint8Array(),
  chainId: Type.String(),
  accountNumber: Type.Number(),
})

export type Algo = Static<typeof Algo>
export const Algo = Type.Union(
  [Type.Literal('secp256k1'), Type.Literal('ed25519'), Type.Literal('sr25519')],
  { 'cosmjs/launchpad': 'but those might diverge in the future.' }
)

export type AccountData = Static<typeof AccountData>
export const AccountData = Type.Object(
  {
    address: Type.Readonly(Type.String()),
    algo: Type.Readonly(Algo),
    pubkey: Type.Readonly(Type.Uint8Array()),
  },
  { 'cosmjs/launchpad': 'but those might diverge in the future.' }
)

export type DirectSignResponse = Static<typeof DirectSignResponse>
export const DirectSignResponse = Type.Object({
  signed: Type.Readonly(SignDoc),
  signature: Type.Readonly(StdSignature),
})

export type OfflineDirectSigner = Static<typeof OfflineDirectSigner>
export const OfflineDirectSigner = Type.Object({
  getAccounts: Type.Readonly(
    Type.Function([], Type.Promise(Type.Readonly(Type.Array(AccountData))))
  ),
  signDirect: Type.Readonly(
    Type.Function([Type.String(), SignDoc], Type.Promise(DirectSignResponse))
  ),
})

export type OfflineAminoSigner = Static<typeof OfflineAminoSigner>
export const OfflineAminoSigner = Type.Object({
  getAccounts: Type.Readonly(
    Type.Function([], Type.Promise(Type.Readonly(Type.Array(AccountData))))
  ),
  signAmino: Type.Readonly(
    Type.Function(
      [Type.String(), StdSignDoc],
      Type.Promise(AminoSignResponse),
      { param: 'signDoc The content that should be signed' }
    )
  ),
})
