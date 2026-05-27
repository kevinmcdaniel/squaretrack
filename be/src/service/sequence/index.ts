import { prisma } from '../../database.js';

type StepInput = {
  order: number;
  type: string;
  callId?: number | null;
  startId?: number | null;
  designator?: string | null;
  count?: number | null;
  text?: string | null;
  helperText?: string | null;
};

function computeIsValid(steps: StepInput[]): boolean {
  const callSteps = steps.filter((s) => s.type === 'call');
  if (callSteps.length === 0) return false;
  return callSteps.every((s) => s.callId != null && s.startId != null);
}

export const createSequenceService = async (data: {
  name: string;
  startFormationId: number;
  activator?: string;
  rating?: string;
  notes?: string;
  isVerified?: boolean;
  sourceText?: string;
  teachOrderId?: number;
  steps: StepInput[];
}) => {
  const { steps, ...meta } = data;
  const isValid = computeIsValid(steps);

  return prisma.sequence.create({
    data: {
      ...meta,
      isValid,
      calls: {
        create: steps.map((s) => ({
          order: s.order,
          type: s.type,
          callId: s.callId ?? null,
          startId: s.startId ?? null,
          designator: s.designator ?? null,
          count: s.count ?? null,
          text: s.text ?? null,
          helperText: s.helperText ?? null,
        })),
      },
    },
    include: { calls: { orderBy: { order: 'asc' } } },
  });
};

export const getSequenceService = async (seqId: number) => {
  return prisma.sequence.findUnique({
    where: { seqId },
    include: { calls: { orderBy: { order: 'asc' } } },
  });
};

export const listSequencesService = async () => {
  return prisma.sequence.findMany({
    include: {
      startFormation: { select: { name: true } },
      calls: {
        orderBy: { order: 'asc' },
        include: {
          callFormation: { include: { call: { select: { name: true } } } },
        },
      },
    },
    orderBy: { name: 'asc' },
  });
};
