import logger from '@logger';
import {Socket } from 'socket.io';

export const handleDisconnect = (socket: Socket) => {
	const disconnect = () => {
		logger.info(`Socket ${socket.id} has disconnected`);
	};

	const disconnecting = () => {
		socket.rooms.forEach(room => {
			if (room !== socket.id) {
				socket.to(room).emit('room:leave', `${socket.id} has left the room.`);
			}
		});
	};

	socket.on('disconnecting', disconnecting);
	socket.on('disconnect', disconnect);
};