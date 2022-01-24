import { DatabaseError, PrismaError } from '@errors/DatabaseError';
import prisma from '@controllers/db-controller';
import { Message } from '@prisma/client';

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
		throw new DatabaseError(error as PrismaError);
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
		throw new DatabaseError(error as PrismaError);
	}
};

export { findChannelMessagesById, createMessage };
