// service - call table
import { prisma } from '../../database.js';

const listCallService = async (iCallId: number) => {
  return prisma.call.findUnique({
    where: {
      callId: iCallId,
    },
  });
};

const listCallsService = async () => {
  return prisma.call.findMany();
};

export { listCallService, listCallsService };
