import { verifyRegistration } from '@swiftprotocol/auth/server.js';
import { randomChallenge } from '@swiftprotocol/auth/utils.js';
import cron from 'cron';
import { hexPubKeyToAddress } from '../../helpers.js';
import { ErrorResponseObject } from '../../types.js';
import { ChallengeRequest, ChallengeResponse, VerifyRequest, VerifyResponse, } from './types.js';
export default function (fastify, _, done) {
    fastify.post('/challenge', {
        schema: {
            body: ChallengeRequest,
            response: {
                200: ChallengeResponse,
                ...ErrorResponseObject,
            },
        },
    }, async (req, res) => {
        const { pubkey } = req.body;
        const { origin } = req.headers;
        if (!origin)
            return res.status(500).send({ error: 'Invalid origin.' });
        try {
            const hexAddress = hexPubKeyToAddress(pubkey);
            const challenge = randomChallenge();
            globalThis.authChallenges.set(pubkey, { challenge, origin });
            // In 5 minutes, if the challenge is still there, remove it
            // This is to prevent a malicious actor from filling up the memory
            new cron.CronJob('*/5 * * * *', () => {
                if (globalThis.authChallenges.has(pubkey)) {
                    globalThis.authChallenges.delete(pubkey);
                }
            }, null, true, 'America/New_York');
            return res.status(200).send({ hexAddress, challenge });
        }
        catch (e) {
            return res.status(500).send({ error: e.message });
        }
    });
    fastify.post('/verify', {
        schema: {
            body: VerifyRequest,
            response: {
                200: VerifyResponse,
                ...ErrorResponseObject,
            },
        },
    }, async (req, res) => {
        const { pubkey, registration } = req.body;
        try {
            const challenge = globalThis.authChallenges.get(pubkey);
            if (!challenge)
                return res
                    .status(404)
                    .send({ error: 'No challenge found for this public key.' });
            const verified = await verifyRegistration(registration, challenge);
            const hexAddress = hexPubKeyToAddress(pubkey);
            return res.status(200).send({
                hexAddress,
                credential: verified.credential,
                client: verified.client,
            });
        }
        catch (e) {
            return res.status(500).send({ error: e.message });
        }
    });
    done();
}
//# sourceMappingURL=index.js.map