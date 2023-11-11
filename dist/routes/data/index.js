import { pubkeyToRawAddress } from '@cosmjs/amino';
import { fromBech32 } from '@cosmjs/encoding';
import { experimentalAdr36Verify } from '../../helpers.js';
import { retrieveData, storeData } from '../../sql/data.js';
import { ErrorResponseObject, } from '../../types.js';
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
        const { address, key, namespace, pubkey } = req.body;
        try {
            if (key.includes('/'))
                return res
                    .status(400)
                    .send({ error: `Key cannot include "/" character.` });
            const rawAddress = fromBech32(address).data;
            const hexAddress = Buffer.from(rawAddress).toString('hex');
            const compositeKey = namespace ? `${namespace}/${key}` : key;
            const entry = await retrieveData(hexAddress, compositeKey);
            if (!entry)
                return res
                    .status(404)
                    .send({ error: 'Could not find entry for this address and key.' });
            const symmetricKeys = JSON.parse(Buffer.from(entry.symmkeys, 'base64').toString());
            const symmetricKey = symmetricKeys.find((symmetricKey) => symmetricKey.recipient === pubkey);
            if (!symmetricKey)
                return res.status(404).send({
                    error: 'Could not find symmetric key for this address. You may not be authorized to access this data.',
                });
            return res
                .status(200)
                .send({ symmetricKey, cipherText: entry.ciphertext, symmetricKeys });
        }
        catch (e) {
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
        const { signature, key, namespace, symmetricKeys, cipherText } = req.body;
        try {
            const verified = await experimentalAdr36Verify(signature);
            if (!verified)
                return res.status(401).send({
                    error: 'Invalid signature, could not verify identity.',
                });
            const rawAddress = pubkeyToRawAddress(signature.signatures[0].pub_key);
            const hexAddress = Buffer.from(rawAddress).toString('hex');
            if (key.includes('/'))
                return res
                    .status(400)
                    .send({ error: `Key cannot include "/" character.` });
            const compositeKey = namespace ? `${namespace}/${key}` : key;
            const symmKeysObject = Buffer.from(JSON.stringify(symmetricKeys)).toString('base64');
            await storeData(hexAddress, compositeKey, symmKeysObject, cipherText);
            return res.status(200).send({ hexAddress, key: compositeKey });
        }
        catch (e) {
            return res.status(500).send({ error: e.message });
        }
    });
    done();
}
//# sourceMappingURL=index.js.map