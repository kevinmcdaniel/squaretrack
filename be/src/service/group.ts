// service - group table
import { prisma } from '../database.js';

const listGroupService = async (iGroupId: string) => {
  return prisma.group.findUnique({
    where: {
      id: iGroupId,
    },
  });
};

const listGroupsService = async () => {
  return prisma.group.findMany();
};

export { listGroupService, listGroupsService };
