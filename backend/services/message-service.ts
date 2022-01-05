import { DatabaseError } from '@errors/DatabaseError';
import prisma from '@controllers/db-controller';

// TODO: Implement async catch handler to avoid try { catch } blocks
const fetchGroupMessages = async (room: string, page: number) => {
	const pageCount = 13;
	try {
		const groupMessages = await prisma.message.findMany({
			skip: page > 1 ? page * pageCount : 0,
			take: pageCount,
			where: {
				room
			},
            orderBy: {
                date: 'desc'
            },
            include: {
                user: {
                    select: {
                        username: true
                    }
                }
            }
		});

		return groupMessages;
	} catch (error) {
		throw new DatabaseError(error);
	}
};

export { fetchGroupMessages };
