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
  return prisma.call.findMany({
    include: {
      callFamily: { select: { name: true } },
      formations: {
        include: {
          startForm: { select: { name: true } },
          endForm: { select: { name: true } },
        },
        orderBy: { startId: 'asc' },
      },
    },
    orderBy: { name: 'asc' },
  });
};

export { listCallService, listCallsService };
