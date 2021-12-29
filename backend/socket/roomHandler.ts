import { Server, Socket } from 'socket.io';
import { Server as HttpServer } from 'http';
import logger from '@logger';
import prisma from '@controllers/db-controller';
import { Message } from '@prisma/client';

export default (io: Server, socket: Socket) => {
	const joinRoom = async ({ room }: any) => {
		const history = await prisma.message.findMany({
			where: { room },
			select: {
				message: true,
				room: true,
				userId: true,
				user: {
					select: {
						username: true
					}
				}
			}
		});
		let historyFlatten: any = [];
		history.forEach(val => historyFlatten.push({ message: val.message, username: val.user.username, room: val.room }));
		socket.emit('history', historyFlatten);

		socket.join(room);
		io.in(room).emit('room:joined', `${socket.user.username} has joined the room ${room}`);
		logger.info(`${socket.user.username} has joined room ${room}`);
	};

	const leaveRoom = (payload: any) => {};

	socket.on('room:join', joinRoom);
	socket.on('room:leave', leaveRoom);
};
