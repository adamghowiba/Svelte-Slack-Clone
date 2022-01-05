import { Server, Socket } from 'socket.io';
import logger from '@logger';
import prisma from '@controllers/db-controller';
import cache from '@utils/CacheUtils';

interface GroupMessage {
	room: string;
	message: string;
}

interface PrivateMessage {
	username: string;
	message: string;
	socketId?: string | number;
	userId?: number;
}

export default (io: Server, socket: Socket) => {
	const onGroupMessageSend = async ({ message, room }: GroupMessage) => {
		if (!socket.rooms.has(room)) return;

		const payload = { message, username: socket.user.username, room };
		io.in(room).emit('message:read', payload);

		console.log(socket.rooms)

		const created = await prisma.message.create({
			data: {
				message,
				room,
				userId: socket.user.id,
				date: new Date()
			}
		});
	};

	const onPrivateMessageSend = ({message, username, socketId}: PrivateMessage) => {
		const payload = { message, username: socket.user.username };

		
	};

	socket.on('message:send', onGroupMessageSend);
	socket.on('private:send', onPrivateMessageSend);
};
