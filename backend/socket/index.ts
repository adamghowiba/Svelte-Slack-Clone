import { Server as SocketServer, ServerOptions, Socket } from 'socket.io';
import { Server as HttpServer } from 'http';
import registerRoomHandler from './roomHandler';
import registerMessageHandler from './messageHandler';
import logger from '@logger';
import session from '../loaders/session';


const SOCKET_SERVER_CONFIG: Partial<ServerOptions> = {
    cors: {
        origin: "http://localhost:5000",
        methods: ["GET", "POST"],
        credentials: true
    },
    transports: ['websocket', 'polling'],
    path: '/socket.io',
}

declare var request: { happy: string }

/**
 * Initialize the socket server, and register the needed socket handlers.
 * @param {HttpServer} httpServer The HTTP server that will create the socket server.
 * @returns {io} Returns the created `Socket IO Server` 
 */
export const InitializeSocket = (httpServer: HttpServer): SocketServer => {
    const io = new SocketServer(httpServer, SOCKET_SERVER_CONFIG);
    io.use(validateUser)

    const registerHandlers = (socket: Socket) => {
        registerRoomHandler(io, socket);
        registerMessageHandler(io, socket);
        handleDisconnect(socket);
        // const session = socket.request.session;
    }

    io.on('connection', registerHandlers);
    return io;
}

const handleDisconnect = (socket: Socket) => {
    const disconnect = () => {
        logger.info(`Socket ${socket.id} has disconnected`);
    }

    const disconnecting = () => {
        socket.rooms.forEach(room => {
            if (room !== socket.id) {
                socket.to(room).emit('room:leave', `${socket.id} has left the room.`)
            }
        })
    }

    socket.on('disconnecting', disconnecting);
    socket.on('disconnect', disconnect);
}

const validateUser = (socket: Socket, next: (err?: any) => void) => {
    const data = socket.handshake;
    const { userId } = socket.handshake.query;

    session((socket.request as any), ({} as any), next)
    next();
}
