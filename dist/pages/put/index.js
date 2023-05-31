"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const data_1 = require("../../data");
const stargate_1 = require("@swiftprotocol/stargate");
const encoding_1 = require("@cosmjs/encoding");
const amino_1 = require("@cosmjs/amino");
const router = express_1.default.Router();
router.get('/', (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(405).end('Cannot GET /sql. Use POST instead.');
}));
router.post('/:userAddress/:key', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { value, namespace, msg } = req.body;
    const { userAddress, key } = req.params;
    if (!userAddress || !key || !msg)
        return res.status(422).json({ error: 'Missing user address, key or signature.' });
    if (!value)
        return res.status(422).json({ error: 'Missing value.' });
    try {
        // Verify user signature
        const verified = yield stargate_1.SigningStargateClient.experimentalAdr36Verify(msg);
        const rawSecp256k1Pubkey = (0, encoding_1.fromBase64)(msg.signatures[0].pub_key.value);
        const rawAddress = (0, amino_1.rawSecp256k1PubkeyToRawAddress)(rawSecp256k1Pubkey);
        const signerAddress = encoding_1.Bech32.encode('juno', rawAddress);
        if (!verified)
            return res.status(401).json({ error: 'Invalid signature, could not verify identity.' });
        if (userAddress !== signerAddress)
            return res.status(401).json({ error: 'Request address and signer address do not match.' });
        // Connect client
        const client = yield globalThis.sql.connect();
        // Insert data
        const data = yield client.query(`INSERT INTO key_value (key, value) VALUES ('${namespace ? namespace + '/' : ''}${key}+${userAddress}', '${value}') ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;`);
        // Store data in user's analytics profile
        const decryptedValue = yield (0, data_1.retrieveData)(userAddress, (namespace ? namespace + '/' : '') + key);
        if (!namespace)
            globalThis.analytics.identify({
                userId: userAddress,
                traits: {
                    [key]: decryptedValue,
                },
            });
        globalThis.analytics.track({
            userId: userAddress,
            event: 'Store Data',
            properties: { [key]: decryptedValue },
        });
        client.release();
        return res.status(200).json(data.rows[0]);
    }
    catch (error) {
        console.log(error);
        return res.status(500).end(error.message);
    }
}));
module.exports = router;
//# sourceMappingURL=index.js.map