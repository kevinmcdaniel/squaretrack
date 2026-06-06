import { prisma } from '../../database.js';

export const createCallService = async (data: {
  name: string;
  tamSeq?: string;
  sdSeq?: string;
  preferredDisplay?: string;
  familyId?: number;
  isPositional?: boolean;
  isGenderCall?: boolean;
  waveRuleApplies?: boolean;
  dancerCount?: number;
}) => {
  return prisma.call.create({ data });
};

export const createCallSynonymService = async (callId: number, alias: string) => {
  return prisma.call_synonym.create({ data: { callId, alias } });
};
