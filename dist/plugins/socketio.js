import fp from 'fastify-plugin';
import { Server } from 'socket.io';
const FastifySocketIO = fp(async function (fastify, opts) {
    fastify.decorate('io', new Server(fastify.server, opts));
    fastify.addHook('onClose', (fastify, done) => {
        ;
        fastify.io.close();
        done();
    });
}, { fastify: '>=4.x.x', name: 'fastify-socket.io' });
export default FastifySocketIO;
//# sourceMappingURL=socketio.js.map