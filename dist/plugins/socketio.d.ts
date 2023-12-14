import type { FastifyPluginAsync } from 'fastify';
import { type ServerOptions } from 'socket.io';
declare const FastifySocketIO: FastifyPluginAsync<Partial<ServerOptions>>;
export default FastifySocketIO;
