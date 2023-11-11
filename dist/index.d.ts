import type { RegistrationChecks } from './types.js';
import pg from 'pg';
declare global {
    var sql: pg.Pool;
    var authChallenges: Map<string, RegistrationChecks>;
}
