import { Type } from '@sinclair/typebox';
import { CredentialKey } from '../../gen/auth.js';
import { StdTx } from '../../gen/cosmos.js';
export const GetRequest = Type.Object({
    pubkey: Type.String(),
});
export const GetResponse = Type.Object({
    hexAddress: Type.String(),
    passkey: Type.String(),
});
export const SetRequest = Type.Object({
    signature: StdTx,
    credential: CredentialKey,
});
export const SetResponse = Type.Object({
    hexAddress: Type.String(),
    credential: CredentialKey,
});
//# sourceMappingURL=types.js.map