import { Client } from 'pg';
declare global {
    var sql: Client;
}
