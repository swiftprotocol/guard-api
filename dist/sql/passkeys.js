import { getPostgresPool } from '../helpers.js';
export async function retrieveKeyByAddress(hexAddress) {
    const sql = getPostgresPool();
    const client = await sql.connect();
    const data = await client
        .query(`SELECT pubkey, address, passkey_id FROM passkeys WHERE address = $1`, [hexAddress])
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
export async function retrieveKeyByPubkey(pubkey) {
    const sql = getPostgresPool();
    const client = await sql.connect();
    const data = await client
        .query(`SELECT pubkey, address, passkey_id FROM passkeys WHERE pubkey = $1`, [pubkey])
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
export async function storeKey(publicKey, hexAddress, credential) {
    const sql = getPostgresPool();
    const client = await sql.connect();
    await client
        .query(`INSERT INTO passkeys (pubkey, address, passkey_id, passkey_pub, passkey_algo) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (address) DO UPDATE SET pubkey = EXCLUDED.pubkey, passkey_id = EXCLUDED.passkey_id, passkey_pub = EXCLUDED.passkey_pub, passkey_algo = EXCLUDED.passkey_algo`, [
        publicKey,
        hexAddress,
        credential.id,
        credential.publicKey,
        credential.algorithm,
    ])
        .catch((err) => {
        throw Error(err.stack);
    });
    client.release();
}
//# sourceMappingURL=passkeys.js.map