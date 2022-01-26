import { Server, Socket } from 'socket.io';
import prisma from '@controllers/db-controller';

interface GroupMessage {
	room: string;
	channelId: string;
	message: string;
}

// TODO Remove comments
// interface PrivateMessage {
// 	username: string;
// 	message: string;
// 	socketId?: string | number;
// 	userId?: number;
// }

export default (io: Server, socket: Socket) => {
	const onGroupMessageSend = async ({ message, channelId }: GroupMessage) => {
		if (!socket.rooms.has(channelId)) return;

		const payload = { message, username: socket.user.username, channelId };
		io.in(channelId).emit('message:read', payload);

		const parsedChannelId = parseInt(channelId, 10);

		await prisma.message.create({
			data: {
				message,
				channel_id: parsedChannelId,
				sender_uid: socket.user.id,
				date: new Date()
			}
		});
	};

	socket.on('message:send', onGroupMessageSend);
};
