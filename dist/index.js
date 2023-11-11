import axios from 'axios';
import dotenv from 'dotenv';
import path from 'path';
import pg from 'pg';
import Swagger from '@fastify/swagger';
import SwaggerUI from '@fastify/swagger-ui';
import Fastify from 'fastify';
import { CronJob } from 'cron';
import { fileURLToPath } from 'url';
import logo from './image.js';
import { SwaggerDefinitions } from './types.js';
import data from './routes/data/index.js';
import passkeys from './routes/passkeys/index.js';
import webauthn from './routes/webauthn/index.js';
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
dotenv.config({ path: `${dirname}/../.env` });
const fastify = Fastify({
    logger: process.env.NODE_ENV === 'development',
}).withTypeProvider();
fastify.register(Swagger, {
    swagger: {
        info: {
            title: 'Swift Guard API',
            version: '1.0.0',
        },
        definitions: SwaggerDefinitions,
    },
});
fastify.register(SwaggerUI, {
    routePrefix: '/',
    uiConfig: {
        docExpansion: 'list',
        deepLinking: true,
    },
    logo: {
        type: 'image/png',
        content: Buffer.from(logo, 'base64'),
    },
    theme: {
        title: 'Swift Guard API',
    },
});
// Register routes
fastify.register(webauthn, { prefix: '/webauthn' });
fastify.register(passkeys, { prefix: '/passkeys' });
fastify.register(data, { prefix: '/data' });
try {
    const port = process.env.PORT ? parseInt(process.env.PORT) : 3450;
    fastify.listen({ port }).then(async () => {
        const [pgHost, pgPass] = [
            process.env.POSTGRES_HOST,
            process.env.POSTGRES_PASS,
        ];
        const heartbeatUrl = process.env.HEARTBEAT_URL;
        if (!pgHost || !pgPass)
            throw new Error('Missing environment variables: "POSTGRES_HOST", "POSTGRES_PASS"');
        const sql = new pg.Pool({
            host: pgHost,
            password: pgPass,
            port: 5432,
            database: 'postgres',
            user: 'guard',
            ssl: { rejectUnauthorized: false },
        });
        console.log(`🔌 Connected to database`);
        globalThis.sql = sql;
        globalThis.authChallenges = new Map();
        // Send heartbeat to BetterStack Uptime every 15 minutes
        if (heartbeatUrl) {
            await axios(heartbeatUrl);
            console.log(`🏓 Established heartbeat connection`);
            new CronJob('*/15 * * * *', () => axios(heartbeatUrl), null, true, 'America/New_York');
        }
        console.log(`🎉 Running on *::${port}`);
    });
}
catch (err) {
    fastify.log.error(err);
    process.exit(1);
}
//# sourceMappingURL=index.js.map