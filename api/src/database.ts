import { PrismaClient } from '@prisma/client';

// temporary with logging
export const prisma = new PrismaClient({
    log: ['info'],
});
// future simple 
// export const prisma = new PrismaClient();
