import { Server as SocketServer, ServerOptions, Socket, Server, RemoteSocket } from 'socket.io';
import { Server as HttpServer } from 'http';
import registerRoomHandler from './roomHandler';
import registerMessageHandler from './messageHandler';
import logger from '@logger';
import session from '../loaders/session';
import { validateUser } from './socketMIddlewear';
import { handleDisconnect } from './connectionHandler';
import { EventEmitterReservedEventsMap } from 'socket.io/dist/socket';
import { User } from '@prisma/client';

const SOCKET_SERVER_CONFIG: Partial<ServerOptions> = {
	cors: {
		origin: 'http://localhost:3000',
		methods: ['GET', 'POST'],
		credentials: true
	},
	transports: ['websocket', 'polling'],
	path: '/socket.io'
};

/**
 * Initialize the socket server, and register the needed socket handlers.
 * @param {HttpServer} httpServer The HTTP server that will create the socket server.
 * @returns {io} Returns the created `Socket IO Server`
 */
let webSocket: Socket;
export const InitializeSocket = (httpServer: HttpServer): SocketServer => {
	const io = new SocketServer(httpServer, SOCKET_SERVER_CONFIG);
	io.use(validateUser);

	const registerHandlers = (socket: Socket) => {
		handleSocketError(socket);
		registerRoomHandler(io, socket);
		registerMessageHandler(io, socket);
		handleDisconnect(io, socket);
		handleConnection(io, socket);
		webSocket = socket;
	};

	io.on('connection', registerHandlers);
	return io;
};

const handleConnection = async (io: Server, socket: Socket) => {
	const sockets = await io.fetchSockets();
	const data = sockets.map(socketCon => {
		return socketCon.user;
	});
	socket.broadcast.emit('user:connected', socket.user);
	socket.emit('user:active', data);
};

const handleSocketError = (socket: Socket) => {
	socket.on('error', err => {
		console.log(err);
		socket.disconnect();
	});
};

export { webSocket };

declare module 'socket.io' {
	interface Socket {
		user?: { username: string; id: number };
	}
	interface RemoteSocket<EmitEvents> {
		user?: { username: string; id: number };
	}
}
