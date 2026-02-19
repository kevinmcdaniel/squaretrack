// database.ts - database connection and create of prisma object
import { PrismaClient } from './generated/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
  connectionString: process.env.DB_SQUARETRACK_URL
});
export const prisma = new PrismaClient({ adapter });
