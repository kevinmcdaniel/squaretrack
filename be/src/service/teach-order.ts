import { prisma } from '../database.js';

type EntryInput = {
  sortOrder: number;
  position: number;
  subPosition?: string | null;
  entryType: string;
  label?: string | null;
  callId?: number | null;
  startId?: number | null;
  week?: number | null;
};

const ENTRY_INCLUDE = { orderBy: { sortOrder: 'asc' } } as const;

export const listTeachOrdersService = async () =>
  prisma.teach_order.findMany({ include: { program: true } });

export const getTeachOrderService = async (id: number) =>
  prisma.teach_order.findUnique({
    where: { id },
    include: { entries: ENTRY_INCLUDE },
  });

export const createTeachOrderService = async (data: {
  name: string;
  programId: number;
  entries: EntryInput[];
}) => {
  const { entries, ...meta } = data;
  return prisma.teach_order.create({
    data: {
      ...meta,
      entries: {
        create: entries.map((e) => ({
          sortOrder: e.sortOrder,
          position: e.position,
          subPosition: e.subPosition ?? null,
          entryType: e.entryType,
          label: e.label ?? null,
          callId: e.callId ?? null,
          startId: e.startId ?? null,
          week: e.week ?? null,
        })),
      },
    },
    include: { entries: ENTRY_INCLUDE },
  });
};

export const updateTeachOrderService = async (id: number, entries: EntryInput[]) => {
  await prisma.teach_order_entry.deleteMany({ where: { teachOrderId: id } });
  return prisma.teach_order.update({
    where: { id },
    data: {
      entries: {
        create: entries.map((e) => ({
          sortOrder: e.sortOrder,
          position: e.position,
          subPosition: e.subPosition ?? null,
          entryType: e.entryType,
          label: e.label ?? null,
          callId: e.callId ?? null,
          startId: e.startId ?? null,
          week: e.week ?? null,
        })),
      },
    },
    include: { entries: ENTRY_INCLUDE },
  });
};

export const checkCallFormationInProgram = async (
  programId: number,
  callId: number,
  startId: number
) =>
  prisma.program_call_formation.findUnique({
    where: { programId_callId_startId: { programId, callId, startId } },
  });
