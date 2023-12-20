import { getPostgresPool } from '../helpers.js';
export async function getAllLivechatClients() {
    const sql = getPostgresPool();
    const client = await sql.connect();
    const data = await client.query(`SELECT * FROM livechat`).catch((err) => {
        throw Error(err.stack);
    });
    if (!data.rowCount || data.rowCount < 1) {
        return [];
    }
    const response = data.rows.map((row) => {
        return { pubkey: row.pubkey, username: row.username };
    });
    client.release();
    return response;
}
export async function queryIsLivechatClientConnected(pubkey) {
    const sql = getPostgresPool();
    const client = await sql.connect();
    const data = await client
        .query(`SELECT * FROM livechat WHERE pubkey = $1`, [pubkey])
        .catch((err) => {
        throw Error(err.stack);
    });
    if (!data.rowCount || data.rowCount < 1) {
        return false;
    }
    client.release();
    return true;
}
export async function addLivechatClient(pubkey, username) {
    const sql = getPostgresPool();
    const client = await sql.connect();
    await client
        .query(`INSERT INTO livechat (pubkey, username) VALUES ($1, $2)`, [
        pubkey,
        username,
    ])
        .catch((err) => {
        throw Error(err.stack);
    });
    client.release();
}
export async function removeLivechatClient(pubkey) {
    const sql = getPostgresPool();
    const client = await sql.connect();
    await client
        .query(`DELETE FROM livechat WHERE pubkey = $1`, [pubkey])
        .catch((err) => {
        throw Error(err.stack);
    });
    client.release();
}
export async function addLivechatRegistration(address, username) {
    const sql = getPostgresPool();
    const client = await sql.connect();
    await client
        .query(`INSERT INTO livechat_names (address, username) VALUES ($1, $2)`, [
        address,
        username,
    ])
        .catch((err) => {
        throw Error(err.stack);
    });
    client.release();
}
export async function retrieveLivechatRegistration(address) {
    const sql = getPostgresPool();
    const client = await sql.connect();
    const data = await client
        .query(`SELECT * FROM livechat_names WHERE address = $1`, [address])
        .catch((err) => {
        throw Error(err.stack);
    });
    if (!data.rowCount || data.rowCount < 1) {
        return undefined;
    }
    client.release();
    return data.rows[0];
}
//# sourceMappingURL=livechat.js.map