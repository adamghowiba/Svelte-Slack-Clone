import { Server as SocketServer, ServerOptions, Socket } from 'socket.io';
import { Server as HttpServer } from 'http';
import registerRoomHandler from './roomHandler';
import registerMessageHandler from './messageHandler';
import logger from '@logger';
import session from '../loaders/session';
import { validateUser } from './socketMIddlewear';
import { handleDisconnect } from './connectionHandler';

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
export const InitializeSocket = (httpServer: HttpServer): SocketServer => {
	const io = new SocketServer(httpServer, SOCKET_SERVER_CONFIG);
	io.use(validateUser);

	const registerHandlers = (socket: Socket) => {
        handleSocketError(socket);
		registerRoomHandler(io, socket);
		registerMessageHandler(io, socket);
		handleDisconnect(socket);
	};

	io.on('connection', registerHandlers);
    return io;
};

const handleSocketError = (socket: Socket) => {
    socket.on("error", err => {
        console.log(err);
        socket.disconnect();
    })
}

declare module 'socket.io' {
	interface Socket {
		user?: { username: string; id: number };
	}
}
