import type { RegistrationChecks } from './types.js';
declare global {
    var authChallenges: Map<string, RegistrationChecks>;
}
