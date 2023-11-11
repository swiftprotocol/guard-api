import { Type } from '@sinclair/typebox';
import { RegistrationEncoded, RegistrationParsed } from '../../gen/auth.js';
export const ChallengeRequest = Type.Object({
    pubkey: Type.String(),
});
export const ChallengeResponse = Type.Object({
    hexAddress: Type.String(),
    challenge: Type.String({ minLength: 16 }),
});
export const VerifyRequest = Type.Object({
    pubkey: Type.String(),
    registration: RegistrationEncoded,
});
export const VerifyResponse = Type.Object({
    hexAddress: Type.String(),
    credential: RegistrationParsed.credential,
    client: RegistrationParsed.client,
});
//# sourceMappingURL=types.js.map