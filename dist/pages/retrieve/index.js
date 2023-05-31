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
const cosmos_1 = require("../../cosmos");
const types_1 = require("@swiftprotocol/types");
const stargate_1 = require("@swiftprotocol/stargate");
const encoding_1 = require("@cosmjs/encoding");
const amino_1 = require("@cosmjs/amino");
const data_1 = require("../../data");
const router = express_1.default.Router();
router.get('/', (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(405).end('Cannot GET /retrieve. Use POST instead.');
}));
router.post('/:userAddress/:key', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body; // { msg, type, contract_address }
    const { userAddress, key } = req.params;
    const { type } = body;
    if (!userAddress || !key)
        return res.status(422).json({ error: 'Missing user address or key.' });
    if (type === 'contract' || type === 'address')
        if (!body.msg)
            return res.status(422).json({ error: 'Missing signature.' });
    if (type === 'contract')
        if (!body.contract_address)
            return res.status(422).json({ error: 'Missing contract address.' });
    try {
        let signerAddress;
        if (type !== 'org') {
            // Verify that the signature is valid
            const { msg } = body;
            const verified = yield stargate_1.SigningStargateClient.experimentalAdr36Verify(msg);
            const rawSecp256k1Pubkey = (0, encoding_1.fromBase64)(msg.signatures[0].pub_key.value);
            const rawAddress = (0, amino_1.rawSecp256k1PubkeyToRawAddress)(rawSecp256k1Pubkey);
            signerAddress = encoding_1.Bech32.encode('juno', rawAddress);
            if (!verified)
                return res.status(401).json({ error: 'Invalid signature, could not verify identity.' });
        }
        else {
            // TODO: Implement organization keys
            return res.status(500).json({ error: 'Organizations not implemented.' });
        }
        if (type === 'contract') {
            // Verify that the signer is an admin of the contract
            if (!body.contract_address)
                return res.status(422).json({ error: 'Missing contract address.' });
            const cosmWasmClient = yield (0, cosmos_1.getCosmWasmClient)(process.env.RPC);
            const client = new types_1.CommerceQueryClient(cosmWasmClient, body.contract_address);
            const { admins } = yield client.adminList();
            if (!admins.includes(signerAddress))
                return res.status(401).json({ error: 'Signer is not an admin of this contract.' });
        }
        // If the request is not from the owner of the data, check authorizations
        if (signerAddress !== userAddress) {
            // Retrieve authorizations
            const authStr = yield (0, data_1.retrieveData)(userAddress, 'authorizations');
            const authorizations = authStr.split(',');
            const localAuthorization = `${type}+${type === 'contract' ? body.contract_address : signerAddress}`;
            if (!authorizations.includes(localAuthorization))
                return res.status(401).json({ error: 'Access unauthorized' });
        }
        // Retrieve data
        const data = yield (0, data_1.retrieveData)(userAddress, (body.namespace ? body.namespace + '/' : '') + key);
        globalThis.analytics.identify({
            userId: signerAddress,
        });
        globalThis.analytics.track({
            userId: signerAddress,
            event: 'Retrieve Data',
        });
        return res.status(200).json({
            key,
            address: userAddress,
            value: data,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).end(error.message);
    }
}));
module.exports = router;
//# sourceMappingURL=index.js.map