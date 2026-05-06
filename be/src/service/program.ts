import { prisma } from '../database.js';

export const createProgramService = async (data: {
  name: string;
  abbreviation: string;
  order: number;
}) => prisma.program.create({ data });

export const listProgramsService = async (opts?: { showInactive?: boolean }) =>
  prisma.program.findMany({
    where: opts?.showInactive ? undefined : { isActive: true },
    orderBy: { order: 'asc' },
  });

export const listProgramCallFormationsService = async (programId: number) =>
  prisma.program_call_formation.findMany({
    where: { programId },
    include: {
      callFormation: { include: { call: true, startForm: true } },
    },
    orderBy: { callId: 'asc' },
  });

export const createProgramCallFormationService = async (data: {
  programId: number;
  callId: number;
  startId: number;
  difficulty: string;
}) => prisma.program_call_formation.create({ data });
