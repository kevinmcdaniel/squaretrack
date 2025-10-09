// database.ts - database connection and create of prisma object
import { PrismaClient } from './generated/client';

// temporary with logging
export const prisma = new PrismaClient({
    log: ['info'],
});
// future simple
// export const prisma = new PrismaClient();
