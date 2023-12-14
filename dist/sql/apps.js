import { getPostgresPool } from '../helpers.js';
export async function retrieveAppById(id) {
    const sql = getPostgresPool();
    const client = await sql.connect();
    const data = await client
        .query(`SELECT * FROM apps WHERE id = $1`, [id])
        .catch((err) => {
        throw Error(err.stack);
    });
    if (!data.rowCount || data.rowCount < 1) {
        return undefined;
    }
    const response = data.rows[0];
    client.release();
    return response;
}
export async function retrieveAppByName(name) {
    const sql = getPostgresPool();
    const client = await sql.connect();
    const data = await client
        .query(`SELECT * FROM apps WHERE name = $1`, [name])
        .catch((err) => {
        throw Error(err.stack);
    });
    if (!data.rowCount || data.rowCount < 1) {
        return undefined;
    }
    const response = data.rows[0];
    client.release();
    return response;
}
export async function retrieveAppByPubkey(pubkey) {
    const sql = getPostgresPool();
    const client = await sql.connect();
    const data = await client
        .query(`SELECT * FROM apps WHERE pubkey = $1`, [pubkey])
        .catch((err) => {
        throw Error(err.stack);
    });
    if (!data.rowCount || data.rowCount < 1) {
        return undefined;
    }
    const response = data.rows[0];
    client.release();
    return response;
}
//# sourceMappingURL=apps.js.map