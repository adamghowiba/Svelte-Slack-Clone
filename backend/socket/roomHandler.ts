import { Server, Socket } from 'socket.io';
import logger from '@logger';
import prisma from '@controllers/db-controller';
import { Message } from '@prisma/client';

export default (io: Server, socket: Socket) => {
	const joinRoom = async ({ room }: any) => {
		socket.join(room);
		io.in(room).emit('room:joined', `${socket.user.username} has joined the room ${room}`);
		logger.info(`${socket.user.username} has joined room ${room}`);
	};

	const leaveRoom = (payload: any) => {};

	socket.on('room:join', joinRoom);
	socket.on('room:leave', leaveRoom);
};
