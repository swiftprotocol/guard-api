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
const router = express_1.default.Router();
router.get('/', (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(405).end('Cannot GET /sql. Use POST instead.');
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query, values } = req.body;
    const hostname = req.headers.origin;
    if (!query)
        return res.status(422).json({ error: 'Missing query.' });
    if (query.includes('$') && (!values || values.length < 1))
        return res.status(422).json({ error: 'Missing values.' });
    // Verify that the host is whitelisted
    if (!process.env.HOSTS.split(',').includes(hostname))
        return res.status(401).json({ error: 'Host unauthorized.' });
    try {
        // Connect client
        const client = yield globalThis.sql.connect();
        // Retrieve data
        const data = yield client.query(query, values);
        client.release();
        return res.status(200).json(data.rows[0]);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
}));
module.exports = router;
//# sourceMappingURL=index.js.map