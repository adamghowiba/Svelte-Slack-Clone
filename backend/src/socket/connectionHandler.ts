import logger from '@logger';
import { Socket, Server } from 'socket.io';

export default (io: Server, socket: Socket) => {
	const disconnect = () => {
		logger.info(`Socket ${socket.id} has disconnected`);
	};

	const disconnecting = () => {
		io.emit('user:disconnected', socket.user);

		socket.rooms.forEach(room => {
			if (room !== socket.id) {
				socket.to(room).emit('room:leave', `${socket.id} has left the room.`);
			}
		});
	};

	socket.on('disconnecting', disconnecting);
	socket.on('disconnect', disconnect);
};
