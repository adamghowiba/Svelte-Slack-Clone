import { User } from "@prisma/client";
import prisma from '@controllers/db-controller';
import ApiError from '@errors/ApiError';

/**
 * Find all users. 
 */
const findAll = async (): Promise<User[]> => {
    const users = await prisma.user.findMany();

    if (!users) throw new ApiError('No users found.');

    return users;
}

export {
    findAll
}