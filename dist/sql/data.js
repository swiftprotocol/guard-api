import { getPostgresPool } from '../helpers.js';
export async function retrieveData(owner, key) {
    const sql = getPostgresPool();
    const client = await sql.connect();
    const data = await client
        .query(`SELECT * FROM data WHERE owner = $1 AND key = $2`, [owner, key])
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
export async function storeData(owner, key, symmkeys, ciphertext) {
    const sql = getPostgresPool();
    const client = await sql.connect();
    await client
        .query(`INSERT INTO data (owner, key, symmkeys, ciphertext) VALUES ($1, $2, $3, $4) ON CONFLICT (owner, key) DO UPDATE SET symmkeys = EXCLUDED.symmkeys, ciphertext = EXCLUDED.ciphertext`, [owner, key, symmkeys, ciphertext])
        .catch((err) => {
        throw Error(err.stack);
    });
    client.release();
}
export async function removeAllDataForOwner(owner) {
    const sql = getPostgresPool();
    const client = await sql.connect();
    await client
        .query(`DELETE FROM data WHERE owner = $1`, [owner])
        .catch((err) => {
        throw Error(err.stack);
    });
    client.release();
}
//# sourceMappingURL=data.js.map