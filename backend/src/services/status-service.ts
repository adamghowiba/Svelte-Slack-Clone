import { DatabaseError } from '@errors/DatabaseError';
import { Status, User } from '@prisma/client';
import { catchAsync } from '@utils/ErrorUtil';

export const getStatus = async (userId: number) => {
	try {
		const userStatus = await prisma.status.findUnique({
			where: {
				user_id: userId
			}
		});

		return userStatus;
	} catch (error) {
		throw new DatabaseError(error);
	}
};

export const updateStatus = async (userId: number, status: string, emoji: string, clearDate: Status['clear_date']): Promise<Status> => {
	try {
		const updatedStatus = await prisma.status.upsert({
			where: {
				user_id: userId
			},
			create: {
				emoji,
				status,
				clear_date: clearDate,
				user_id: 1
			},
			update: {
				emoji,
				status,
				clear_date: clearDate
			}
		});

		return updatedStatus;
	} catch (error) {
		throw new DatabaseError(error);
	}
};

export const deleteStatus = async (userId: User['id']) => {
	try {
		const updatedStatus = await prisma.status.delete({
			where: {
				user_id: userId
			}
		});

		return updatedStatus;
	} catch (error) {
		throw new DatabaseError(error);
	}
};
