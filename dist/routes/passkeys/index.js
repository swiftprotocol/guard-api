import { pubkeyToRawAddress } from '@cosmjs/amino';
import { fromBech32 } from '@cosmjs/encoding';
import { experimentalAdr36Verify, verifySignature } from '../../helpers.js';
import { removeAllDataForOwner } from '../../sql/data.js';
import { retrieveKeyByAddress, storeKey } from '../../sql/passkeys.js';
import { ErrorResponseObject } from '../../types.js';
import { GetRequest, GetResponse, SetRequest, SetResponse, } from './types.js';
export default function (fastify, _, done) {
    fastify.post('/get', {
        schema: {
            body: GetRequest,
            response: {
                200: GetResponse,
                ...ErrorResponseObject,
            },
        },
    }, async (req, res) => {
        const { address } = req.body;
        try {
            const rawAddress = fromBech32(address).data;
            const hexAddress = Buffer.from(rawAddress).toString('hex');
            const passkeyResponse = await retrieveKeyByAddress(hexAddress);
            if (!passkeyResponse)
                return res
                    .status(404)
                    .send({ error: 'Could not find passkey for this address.' });
            return res.status(200).send({
                hexAddress,
                pubkey: passkeyResponse.pubkey,
                passkey: passkeyResponse.passkey_id,
            });
        }
        catch (e) {
            console.log(e);
            return res.status(500).send({ error: e.message });
        }
    });
    fastify.post('/set', {
        schema: {
            body: SetRequest,
            response: {
                200: SetResponse,
                ...ErrorResponseObject,
            },
        },
    }, async (req, res) => {
        const { walletSignature, signature, publicKey, credential } = req.body;
        try {
            const verified = await experimentalAdr36Verify(walletSignature);
            if (!verified)
                return res.status(401).send({
                    error: 'Invalid wallet signature, could not verify identity.',
                });
            const rawAddress = pubkeyToRawAddress(walletSignature.signatures[0].pub_key);
            const hexAddress = Buffer.from(rawAddress).toString('hex');
            const pubkeyVerified = await verifySignature(publicKey, signature, hexAddress);
            if (!pubkeyVerified)
                return res
                    .status(401)
                    .send({ error: 'Invalid signature, could not verify identity.' });
            const currentKey = await retrieveKeyByAddress(hexAddress);
            if (currentKey) {
                await removeAllDataForOwner(currentKey.pubkey);
            }
            await storeKey(publicKey, hexAddress, credential);
            return res.status(200).send({ hexAddress, credential });
        }
        catch (e) {
            return res.status(500).send({ error: e.message });
        }
    });
    done();
}
//# sourceMappingURL=index.js.map