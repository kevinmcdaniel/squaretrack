import { prisma } from '../../database.js';

export const listFormationService = async (formId: number) => {
  return prisma.formation.findUnique({ where: { formId } });
};

export const listFormationsService = async () => {
  return prisma.formation.findMany();
};

export const searchFormationsService = async (search: string) => {
  return prisma.formation.findMany({
    where: { name: { contains: search, mode: 'insensitive' } },
  });
};

export const listFormationsByCallService = async (callId: number) => {
  const rows = await prisma.call_formation.findMany({
    where: { callId },
    include: { startForm: true },
  });
  return rows.map((r) => r.startForm);
};

export const createFormationService = async (data: {
  name: string;
  description?: string;
  clCode?: string;
  sdCode?: string;
}) => {
  return prisma.formation.create({ data });
};

export const createCallFormationService = async (data: {
  callId: number;
  startId: number;
  endId: number;
  inFlowRotation?: string;
  inFlowDirection?: string;
  outFlowRotation?: string;
  outFlowDirection?: string;
}) => {
  return prisma.call_formation.create({ data });
};
