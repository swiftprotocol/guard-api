import { Pool } from 'pg';
declare global {
    var sql: Pool;
}
