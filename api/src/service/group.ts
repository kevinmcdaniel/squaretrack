// service - group table
import { prisma } from '../database';
import { group } from '@prisma/client';


const listGroupService = async (iGroupId: string): Promise<group | null> => {
  return prisma.group.findUnique({
    where: {
      id: iGroupId,
    },
  });
};

const listGroupsService = async (): Promise<group[]> => {
  return prisma.group.findMany();
};

export { listGroupService, listGroupsService };
