import { prisma } from '../database.js';

export const listCallFamiliesService = async () => {
  return prisma.call_family.findMany({
    include: { _count: { select: { calls: true } } },
    orderBy: { name: 'asc' },
  });
};

export const listCallFamilyService = async (familyId: number) => {
  return prisma.call_family.findUnique({
    where: { familyId },
    include: { calls: { select: { callId: true, name: true } } },
  });
};
