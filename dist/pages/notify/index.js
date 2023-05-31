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
const mail_1 = __importDefault(require("@sendgrid/mail"));
const router = express_1.default.Router();
const template_id = 'd-69694c42327145dfa43d387e39584d5b';
const titleCase = (s) => s.replace(/^_*(.)|_+(.)/g, (s, c, d) => (c ? c.toUpperCase() : ' ' + d.toUpperCase()));
router.get('/', (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(405).end('Cannot GET /retrieve. Use POST instead.');
}));
router.post('/:userAddress', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userAddress } = req.params;
    const api_key = req.headers.authorization;
    const { content, title } = req.body;
    if (!userAddress)
        return res.status(422).json({ error: 'Missing user address.' });
    if (!content || !title)
        return res.status(422).json({ error: 'Missing content or title.' });
    let app_id;
    // Verify that api_key exists
    try {
        const client = yield globalThis.sql.connect();
        const data = yield client.query(`SELECT id FROM notify_keys WHERE api_key = '${api_key}'`);
        client.release();
        if (!data.rows[0])
            return res.status(401).json({ error: 'Host unauthorized.' });
        else
            app_id = data.rows[0].id;
    }
    catch (error) {
        console.log(error);
        return res.status(500).end(error.message);
    }
    try {
        // Retrieve authorizations
        const authStr = yield (0, data_1.retrieveData)(userAddress, 'notify-authorizations');
        const authorizations = authStr.split(',');
        if (!authorizations.includes(app_id))
            return res.status(401).json({ error: 'Access unauthorized' });
        // Retrieve email
        const email = yield (0, data_1.retrieveData)(userAddress, 'email');
        const mailMsg = {
            to: email,
            from: {
                name: titleCase(app_id),
                email: 'checkout@swiftprotocol.zone',
            },
            templateId: template_id,
            personalizations: [
                {
                    to: [
                        {
                            email,
                        },
                    ],
                    dynamicTemplateData: {
                        content,
                        title,
                    },
                },
            ],
        };
        mail_1.default.setApiKey(process.env.SENDGRID_API_KEY);
        yield mail_1.default.send(mailMsg).catch((err) => {
            throw Error(err);
        });
        globalThis.analytics.identify({
            userId: app_id,
        });
        globalThis.analytics.group({
            groupId: app_id,
            userId: app_id,
            traits: {
                name: titleCase(app_id),
                plan: 'none',
            },
        });
        globalThis.analytics.track({
            userId: app_id,
            event: 'Notify User',
            properties: {
                user: userAddress,
                content,
                title,
            },
        });
        return res.status(200).json({ result: 'sent' });
    }
    catch (error) {
        console.log(error);
        return res.status(500).end(error.message);
    }
}));
module.exports = router;
//# sourceMappingURL=index.js.map