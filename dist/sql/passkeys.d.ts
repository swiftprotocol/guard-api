import type { CredentialKey } from '@swiftprotocol/auth/types.js';
interface RetrieveKeyReturnType {
    passkey_id: string;
    pubkey: string;
    address: string;
}
export declare function retrieveKeyByAddress(hexAddress: string): Promise<RetrieveKeyReturnType | undefined>;
export declare function retrieveKeyByPubkey(pubkey: string): Promise<RetrieveKeyReturnType | undefined>;
export declare function storeKey(publicKey: string, hexAddress: string, credential: CredentialKey): Promise<void>;
export {};
