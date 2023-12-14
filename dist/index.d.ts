import type { Server as SocketIOServer } from 'socket.io';
import type { RegistrationChecks } from './types.js';
import type { ClientToServerEventsType, InterServerEventsType, ServerToClientEventsType, SocketDataType } from './routes/ws/types.js';
declare global {
    var authChallenges: Map<string, RegistrationChecks>;
}
declare module 'fastify' {
    interface FastifyInstance {
        io: SocketIOServer<ClientToServerEventsType, ServerToClientEventsType, InterServerEventsType, SocketDataType>;
    }
}
