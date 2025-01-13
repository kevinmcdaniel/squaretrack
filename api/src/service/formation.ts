// service - formation table
import { prisma } from '../database';
import { formation } from '@prisma/client';


const listFormationService = async (iFormationId: number): Promise<formation | null> => {
  return prisma.formation.findUnique({
    where: {
      formId: iFormationId,
    },
  });
};

const listFormationsService = async (): Promise<formation[]> => {
  return prisma.formation.findMany();
};

export { listFormationService, listFormationsService };
