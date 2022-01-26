import { Server, Socket } from 'socket.io';
import logger from '@logger';

export default (io: Server, socket: Socket) => {
	const joinRoom = async ({ channelId }: { channelId: string }) => {
		await socket.join(channelId);
		io.in(channelId).emit('room:joined', `${socket.user.username} has joined the room ${channelId}`);
		logger.info(`${socket.user.username} has joined room ${channelId}`);
	};

	// const leaveRoom = (payload: any) => {};

	socket.on('room:join', joinRoom);
	// socket.on('room:leave', leaveRoom);
};
