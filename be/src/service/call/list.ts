// service - call table
import { prisma } from '../../database';
import { call } from '@prisma/client';


const listCallService = async (iCallId: number): Promise<call | null> => {
  return prisma.call.findUnique({
    where: {
      callId: iCallId,
    },
  });
};

const listCallsService = async (): Promise<call[]> => {
  return prisma.call.findMany();
};

export { listCallService, listCallsService };
