import { Status, User } from '@prisma/client';
import { catchAsync } from '@utils/ErrorUtil';

export const getStatus = async (userId: number) => {
	const userStatus = await prisma.status.findUnique({
		where: {
			user_id: userId
		}
	});

	return userStatus;
};

export const updateStatus = async (userId: number, status: string, emoji: string, clearDate: Status['clear_date']): Promise<Status> => {
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
};
