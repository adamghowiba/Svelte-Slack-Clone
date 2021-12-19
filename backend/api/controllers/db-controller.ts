import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient({
    errorFormat: 'minimal'
});

export default prismaClient