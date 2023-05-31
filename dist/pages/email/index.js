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
const mail_1 = __importDefault(require("@sendgrid/mail"));
const assets_1 = __importDefault(require("../../db/assets"));
const router = express_1.default.Router();
const emails = [
    {
        name: 'fulfillment_confirmation',
        template_id: 'd-df793d96cfc54daf83c995a69f33a2e7',
    },
    {
        name: 'shipping_confirmation',
        template_id: 'd-82722adc5bf04912a64001fd8c0d22c0',
    },
];
router.get('/', (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(405).end('Cannot GET /email. Use POST instead.');
}));
router.post('/:userAddress/:type', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const body = req.body; // { msg, contract_address, order }
    const { userAddress, type } = req.params;
    if (!userAddress || !type)
        return res.status(422).json({ error: 'Missing user address, email type.' });
    if (!body.order)
        return res.status(422).json({ error: 'Missing order ID.' });
    if (!body.msg)
        return res.status(422).json({ error: 'Missing signature.' });
    if (!body.contract_address)
        return res.status(422).json({ error: 'Missing contract address.' });
    if (!emails.find((email) => email.name === type))
        return res.status(422).json({ error: 'Incorrect email type.' });
    try {
        let signerAddress;
        // Verify that the signature is valid
        const { msg } = body;
        const verified = yield stargate_1.SigningStargateClient.experimentalAdr36Verify(msg);
        const rawSecp256k1Pubkey = (0, encoding_1.fromBase64)(msg.signatures[0].pub_key.value);
        const rawAddress = (0, amino_1.rawSecp256k1PubkeyToRawAddress)(rawSecp256k1Pubkey);
        signerAddress = encoding_1.Bech32.encode('juno', rawAddress);
        if (!verified)
            return res.status(401).json({ error: 'Invalid signature, could not verify identity.' });
        // Verify that the signer is an admin of the contract
        if (!body.contract_address)
            return res.status(422).json({ error: 'Missing contract address.' });
        const cosmWasmClient = yield (0, cosmos_1.getCosmWasmClient)(process.env.RPC);
        const client = new types_1.CommerceQueryClient(cosmWasmClient, body.contract_address);
        const { admins } = yield client.adminList();
        if (!admins.includes(signerAddress))
            return res.status(401).json({ error: 'Signer is not an admin of this contract.' });
        // Retrieve marketing & order data
        const { config } = yield client.config();
        const { marketing } = yield client.marketing();
        const { order } = yield client.order({ id: body.order });
        const { cost } = yield client.orderCost({ id: body.order });
        if (!order)
            return res.status(404).json({ error: 'Order not found.' });
        // Retrieve item data
        const itemArr = order.items.map(({ listing_id, amount }) => __awaiter(void 0, void 0, void 0, function* () {
            const listing = yield client.listing({ id: listing_id });
            return Object.assign(Object.assign({}, listing === null || listing === void 0 ? void 0 : listing.listing), { amount });
        }));
        const items = yield Promise.all(itemArr);
        const itemData = items.map((item) => {
            const uprice = 'native' in Object(item.price)
                ? parseInt(item.price.native.amount) / 1000000
                : 'cw20' in Object(item.price)
                    ? parseInt(item.price.cw20.amount) / 1000000
                    : 0;
            return Object.assign(Object.assign({}, item), { uprice: uprice * item.amount });
        });
        // Retrieve token data
        const junoClient = yield (0, cosmos_1.getJunoClient)(process.env.RPC);
        const tokenType = config.token.token_type;
        let coin;
        if (tokenType === 'cw20') {
            const tokenInfo = yield cosmWasmClient.queryContractSmart(config.token.denom, {
                token_info: {},
            });
            coin = tokenInfo.symbol || '';
        }
        else {
            if (config.token.denom.includes('ibc/')) {
                const asset = assets_1.default.find((token) => {
                    return token.juno_denom === config.token.denom;
                });
                coin = asset ? asset.symbol : '';
            }
            else if (config.token.denom.includes('factory/')) {
                const metadata = yield junoClient.cosmos.bank.v1beta1.denomMetadata({
                    denom: config.token.denom,
                });
                coin = metadata ? (_a = metadata === null || metadata === void 0 ? void 0 : metadata.metadata) === null || _a === void 0 ? void 0 : _a.symbol : '';
            }
            else {
                const asset = assets_1.default.find((token) => token.denom === config.token.denom);
                coin = asset ? asset.symbol : '';
            }
        }
        // Retrieve authorizations
        const authStr = yield (0, data_1.retrieveData)(userAddress, 'authorizations');
        const authorizations = authStr.split(',');
        const localAuthorization = `contract+${body.contract_address}`;
        if (!authorizations.includes(localAuthorization))
            return res.status(401).json({ error: 'Access unauthorized' });
        // Retrieve email
        const email = yield (0, data_1.retrieveData)(userAddress, 'email');
        // Send email
        const mailMsg = {
            to: email,
            from: {
                name: `${marketing.name} @ Swift Protocol`,
                email: 'checkout@swiftprotocol.zone',
            },
            templateId: (_b = emails.find((email) => email.name === type)) === null || _b === void 0 ? void 0 : _b.template_id,
            personalizations: [
                {
                    to: [
                        {
                            email,
                        },
                    ],
                    dynamicTemplateData: Object.assign({ merchant: marketing.name, items: itemData.map((item) => {
                            return {
                                name: item.attributes.name,
                                image: item.attributes.images[0],
                                amount: item.amount,
                                price: item.uprice.toFixed(2) + ' ' + coin,
                            };
                        }), total: (parseInt(cost) / 1000000).toFixed(2) + ' ' + coin }, req.body),
                },
            ],
        };
        mail_1.default.setApiKey(process.env.SENDGRID_API_KEY);
        mail_1.default.send(mailMsg).catch((err) => {
            throw Error(err);
        });
        return res.status(200).json({ result: 'sent' });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
}));
module.exports = router;
//# sourceMappingURL=index.js.map