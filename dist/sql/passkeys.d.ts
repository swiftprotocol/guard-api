import type { CredentialKey } from '@swiftprotocol/auth/types.js';
export declare function retrieveKey(hexAddress: string): Promise<string | undefined>;
export declare function storeKey(hexAddress: string, credential: CredentialKey): Promise<void>;
