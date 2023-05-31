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
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const pg_1 = require("pg");
const analytics_node_1 = require("@segment/analytics-node");
const cron_1 = require("cron");
const axios_1 = __importDefault(require("axios"));
// Load .env
dotenv_1.default.config({ path: `${__dirname}/../.env` });
// Config Express.js
const app = (0, express_1.default)();
app.use((0, cors_1.default)()); // Allow all CORS
app.use(body_parser_1.default.json()); // Use JSON body
// Load pages
app.use('/', require('./pages'));
app.use('/status', require('./pages/status'));
app.use('/retrieve', require('./pages/retrieve'));
app.use('/put', require('./pages/put'));
app.use('/email', require('./pages/email'));
app.use('/notify', require('./pages/notify'));
// Start server & listen for requests
const PORT = process.env.PORT || 3450;
try {
    const server = app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
        const client = new pg_1.Pool({
            host: process.env.POSTGRES_HOST,
            password: process.env.POSTGRES_PASS,
            port: parseInt(process.env.POSTGRES_PORT),
            database: 'postgres',
            user: 'guard',
            ssl: { rejectUnauthorized: false },
        });
        globalThis.sql = client;
        const analytics = new analytics_node_1.Analytics({
            writeKey: process.env.SEGMENT_WRITE_KEY,
        });
        globalThis.analytics = analytics;
        // Send heartbeat to BetterStack Uptime every 15 minutes
        if (process.env.HEARTBEAT_URL) {
            (0, axios_1.default)(process.env.HEARTBEAT_URL);
            const job = new cron_1.CronJob('*/15 * * * *', () => (0, axios_1.default)(process.env.HEARTBEAT_URL), null, true, 'America/New_York');
            globalThis.job = job;
        }
        console.log(`🎉 Running on *::${PORT}`);
    }));
    const onExit = () => __awaiter(void 0, void 0, void 0, function* () {
        yield analytics.closeAndFlush();
        server.close(() => {
            console.log('❌ Closing server...');
            process.exit();
        });
    });
    ['SIGINT', 'SIGTERM'].forEach((code) => process.on(code, onExit));
}
catch (err) {
    console.error(err);
}
//# sourceMappingURL=index.js.map