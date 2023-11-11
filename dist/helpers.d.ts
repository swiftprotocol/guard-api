import { StdTx } from '@cosmjs/amino';
export declare function hexPubKeyToAddress(pubkey: string): string;
export declare function experimentalAdr36Verify(signed: StdTx): Promise<boolean>;
