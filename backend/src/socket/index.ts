import logger from '@logger';
import { Server as HttpServer } from 'http';
import { Server, Server as SocketServer, ServerOptions, Socket } from 'socket.io';
import handleDisconnect from './connectionHandler';
import registerMessageHandler from './messageHandler';
import registerRoomHandler from './roomHandler';
import { validateUser } from './socketMiddlewear';

const SOCKET_SERVER_CONFIG: Partial<ServerOptions> = {
	cors: {
		origin: 'http://localhost:3000',
		methods: ['GET', 'POST'],
		credentials: true
	},
	transports: ['websocket', 'polling'],
	path: '/socket.io'
};

const handleConnection = async (io: Server, socket: Socket) => {
	const sockets = await io.fetchSockets();
	const data = sockets.map(socketCon => socketCon.user);
	socket.broadcast.emit('user:connected', socket.user);
	socket.emit('user:active', data);
};

const handleSocketError = (socket: Socket) => {
	socket.on('error', err => {
		socket.disconnect();
		logger.error(err);
	});
};

/**
 * Initialize the socket server, and register the needed socket handlers.
 * @param {HttpServer} httpServer The HTTP server that will create the socket server.
 * @returns {io} Returns the created `Socket IO Server`
 */
// eslint-disable-next-line import/prefer-default-export
export const InitializeSocket = (httpServer: HttpServer): SocketServer => {
	const io = new SocketServer(httpServer, SOCKET_SERVER_CONFIG);
	// eslint-disable-next-line @typescript-eslint/no-misused-promises
	io.use(validateUser);

	const registerHandlers = async (socket: Socket) => {
		handleSocketError(socket);
		registerRoomHandler(io, socket);
		registerMessageHandler(io, socket);
		handleDisconnect(io, socket);
		await handleConnection(io, socket);
	};

	io.on('connection', registerHandlers);
	return io;
};

declare module 'socket.io' {
	// eslint-disable-next-line no-shadow
	interface Socket {
		user?: { username: string; id: number };
	}
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	interface RemoteSocket<EmitEvents> {
		user?: { username: string; id: number };
	}
}
