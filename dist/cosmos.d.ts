import { Secp256k1HdWallet } from '@cosmjs/amino';
import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { SigningStargateClient } from '@swiftprotocol/stargate';
export declare function getCosmWasmClient(rpc: string): Promise<CosmWasmClient>;
export declare function getSigningStargateClient(rpc: string, wallet: Secp256k1HdWallet): Promise<SigningStargateClient>;
export declare function getWallet(): Promise<{
    wallet: Secp256k1HdWallet;
    account: import("@cosmjs/amino").AccountData;
}>;
