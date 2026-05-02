import { prisma } from '../database.js';

export type FasrInput = {
  fasrOrder: number;
  callId: number;
  startId: number;
};

export type EntryInput = {
  entryOrder: number;
  displayOrder: string;
  entryType: 'family' | 'call';
  label?: string | null;
  familyId?: number | null;
  callId?: number | null;
  week?: number | null;
  fasrs?: FasrInput[];
};

const ENTRY_INCLUDE = {
  orderBy: { entryOrder: 'asc' },
  include: { fasrs: { orderBy: { fasrOrder: 'asc' } } },
} as const;

export const listTeachOrdersService = async () =>
  prisma.teach_order.findMany({ include: { program: true } });

export const getTeachOrderService = async (id: number) =>
  prisma.teach_order.findUnique({
    where: { id },
    include: { entries: ENTRY_INCLUDE },
  });

function buildEntryCreate(entries: EntryInput[]) {
  return entries.map((e) => ({
    entryOrder: e.entryOrder,
    displayOrder: e.displayOrder,
    entryType: e.entryType,
    label: e.label ?? null,
    familyId: e.familyId ?? null,
    callId: e.callId ?? null,
    week: e.week ?? null,
    fasrs: e.fasrs?.length
      ? {
          create: e.fasrs.map((f) => ({
            fasrOrder: f.fasrOrder,
            callId: f.callId,
            startId: f.startId,
          })),
        }
      : undefined,
  }));
}

export const createTeachOrderService = async (data: {
  name: string;
  programId: number;
  entries: EntryInput[];
}) => {
  const { entries, ...meta } = data;
  return prisma.teach_order.create({
    data: {
      ...meta,
      entries: { create: buildEntryCreate(entries) },
    },
    include: { entries: ENTRY_INCLUDE },
  });
};

export const updateTeachOrderService = async (id: number, entries: EntryInput[]) => {
  await prisma.teach_order_entry.deleteMany({ where: { teachOrderId: id } });
  return prisma.teach_order.update({
    where: { id },
    data: {
      entries: { create: buildEntryCreate(entries) },
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
