import { getAllLivechatClients } from '../../../sql/livechat.js';
import { ErrorResponseObject } from '../../../types.js';
import { ClientsResponse } from './types.js';
export default function (fastify, _, done) {
    fastify.get('/clients', {
        schema: {
            response: {
                200: ClientsResponse,
                ...ErrorResponseObject,
            },
        },
    }, async (_, res) => {
        try {
            const clients = await getAllLivechatClients();
            res.status(200).send({ clients });
        }
        catch (e) {
            res.status(500).send({ error: 'Internal Server Error' });
        }
    });
    done();
}
//# sourceMappingURL=index.js.map