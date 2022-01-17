import config from '@config';
import logger from '@logger';
import { PrismaClient } from '@prisma/client';

declare global {
    var prisma: PrismaClient
}

const prisma = global.prisma || new PrismaClient({ errorFormat: 'minimal' });

if (config.isDevelopment) global.prisma = prisma;

export const connectDb = async () => {
    try {
        await prisma.$connect()
        logger.info('Databse connection established successfully.')
    } catch (error) {
        const { message, stack, statusCode } = error;
        logger.error(`Database connection failed!`, { message, stack, statusCode });
        process.exitCode = 1;
    }
}

export default prisma;