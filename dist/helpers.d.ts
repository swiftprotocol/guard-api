import { StdTx } from '@cosmjs/amino';
export declare function hexPubKeyToAddress(pubkey: string): string;
export declare function verifySignature(publicKeyHex: string, signatureHex: string, message: string): Promise<boolean>;
export declare function experimentalAdr36Verify(signed: StdTx): Promise<boolean>;
