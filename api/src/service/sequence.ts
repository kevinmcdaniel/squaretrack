// service - sequence table
import { prisma } from '../database';
import { sequence } from '@prisma/client';


const listSequenceService = async (iFormationId: number): Promise<sequence | null> => {
  return prisma.sequence.findUnique({
    where: {
      seqId: iFormationId,
    },
  });
};

const listSequencesService = async (): Promise<sequence[]> => {
  return prisma.sequence.findMany();
};

export { listSequenceService, listSequencesService };
