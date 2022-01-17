import { Channel, ChannelType, User } from '@prisma/client';
import prisma from '@controllers/db-controller';
import ApiError from '@errors/ApiError';
import logger from '@logger';
import { DatabaseError } from '@errors/DatabaseError';

const findAll = async (): Promise<User[]> => {
	const allUsers = await prisma.user.findMany();

	return allUsers;
};

const findById = async (userId: User['id']): Promise<User> => {
	const user = await prisma.user.findUnique({
		where: {
			id: userId
		}
	});

	return user;
};

const findByUsername = async (username: User['username']): Promise<User> => {
	const user = await prisma.user.findUnique({
		where: {
			username
		}
	});

	return user;
};

const createUser = async (username: string): Promise<Partial<User>> => {
	try {
		const createdUser = await prisma.user.create({
			data: {
				username,
				last_name: null,
				first_name: null,
				display_name: null
			},
			select: {
				username: true,
				id: true
			}
		});

		return createdUser;
	} catch (error) {
		throw new DatabaseError(error);
	}
};

export { findById, findAll, createUser, findByUsername };
