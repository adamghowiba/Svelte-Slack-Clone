import { DatabaseError } from '@errors/DatabaseError';
import prisma from '@controllers/db-controller';
import { Message } from '@prisma/client';

/* 
- Older Method (Users with messages & Channel with messages)
 * Get group messages 389 ms
*/

const findChannelMessagesById = async (channelId: number, page: number): Promise<Message[]> => {
	const pageCount = 13;
	try {
		const groupMessages = await prisma.channel.findUnique({
			where: {
				id: channelId
			},
			include: {
				messages: {
					include: {
						sender: {
							select: {
								username: true,
								id: true
							}
						}
					},
					skip: page > 1 ? page * pageCount : 0,
					take: pageCount,
					orderBy: {
						date: 'desc'
					}
				}
			}
		});

		return groupMessages.messages;
	} catch (error) {
		throw new DatabaseError(error);
	}
};

const createMessage = async (senderId: number, channelId: number, message: string) => {
	try {
		const result = await prisma.message.create({
			data: {
				channel_id: channelId,
				sender_uid: senderId,
				message
			}
		});

		return result;
	} catch (error) {
		throw new DatabaseError(error);
	}
};

export { findChannelMessagesById, createMessage };
