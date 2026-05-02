import 'dotenv/config';
import { prisma } from '../database.js';

// Test data uses this prefix to identify and clean up after tests
export const T = '_TEST_';

export async function cleanupTestData() {
  await prisma.teach_order_entry_fasr.deleteMany({ where: { entry: { teachOrder: { name: { startsWith: T } } } } });
  await prisma.teach_order_entry.deleteMany({ where: { teachOrder: { name: { startsWith: T } } } });
  await prisma.teach_order.deleteMany({ where: { name: { startsWith: T } } });
  await prisma.program_call_formation.deleteMany({ where: { program: { name: { startsWith: T } } } });
  await prisma.program_call_formation.deleteMany({ where: { callFormation: { call: { name: { startsWith: T } } } } });
  await prisma.sequence_calls.deleteMany({ where: { sequence: { name: { startsWith: T } } } });
  await prisma.sequence.deleteMany({ where: { name: { startsWith: T } } });
  await prisma.call_synonym.deleteMany({ where: { alias: { startsWith: T } } });
  await prisma.call_formation.deleteMany({ where: { call: { name: { startsWith: T } } } });
  await prisma.call.deleteMany({ where: { name: { startsWith: T } } });
  await prisma.call_family.deleteMany({ where: { name: { startsWith: T } } });
  await prisma.formation.deleteMany({ where: { name: { startsWith: T } } });
  await prisma.program.deleteMany({ where: { name: { startsWith: T } } });
}

afterAll(async () => {
  await cleanupTestData();
  await prisma.$disconnect();
});
