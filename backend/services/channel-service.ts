import { DatabaseError } from '@errors/DatabaseError';
import prisma from '@controllers/db-controller';
import { ChannelType, Channel, User } from '@prisma/client';

const findAllPublic = async (users = true) => {
	try {
		const channelData = await prisma.channel.findMany({
			where: {
				type: 'PUBLIC'
			},
			select: {
				id: true,
				name: true,
				type: true,
				users: !users
					? false
					: {
							select: {
								username: true,
								id: true
							}
					  }
			}
		});

		return channelData;
	} catch (error) {
		throw new DatabaseError(error);
	}
};

const findById = async (channelId: number, users = true) => {
	try {
		const channelData = await prisma.channel.findUnique({
			where: {
				id: channelId
			},
			select: {
				id: true,
				name: true,
				type: true,
				users: !users
					? false
					: {
							select: {
								username: true,
								id: true
							}
					  }
			}
		});

		return channelData;
	} catch (error) {
		throw new DatabaseError(error);
	}
};

const findAllPrivate = async (userId: number, type: ChannelType): Promise<Pick<User, 'id' | 'username'>[]> => {
	const userData = await prisma.user.findUnique({
		where: {
			id: userId
		},
		include: {
			channels: {
				where: {
					type
				},
				include: {
					users: {
						select: {
							username: true,
							id: true
						}
					}
				}
			}
		}
	});

	const sanitizedChannel = (data: any, channelId: any) => {
		return { ...data, channelId };
	};
	const data = userData.channels.map(channel =>
		channel.users.reduce((prev, curr) => sanitizedChannel(prev.id == userId ? curr : prev, channel.id))
	);
	return data;
};

export const checkPrivateExists = async (user1Id: number, user2Id: number) => {
	try {
		const result = await prisma.channel.findFirst({
			where: {
				AND: {
					type: 'PRIVATE',
					users: {
						some: {
							id: { in: [user1Id, user2Id] }
						}
					}
				}
			}
		});

		return result ? true : false;
	} catch (error) {
		throw new DatabaseError(error);
	}
};

const createPrivate = async (senderId: number, receiverId: number) => {
	try {
		const result = prisma.channel.create({
			data: {
				type: 'PRIVATE',
				users: {
					connect: [{ id: senderId }, { id: receiverId }]
				}
			}
		});

		return result;
	} catch (error) {
		throw new DatabaseError(error);
	}
};

const createPublic = async (name: string) => {
	try {
		const result = await prisma.channel.create({
			data: {
				type: 'PUBLIC',
				name
			}
		});

		return result;
	} catch (error) {
		throw new DatabaseError(error);
	}
};

const updateChannel = async (senderId: number, channelId: number, message: string) => {};

export { findById, createPrivate, createPublic, findAllPublic, findAllPrivate };
