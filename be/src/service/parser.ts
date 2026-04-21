import { prisma } from '../database.js';

const DESIGNATORS = ['heads', 'sides', 'boys', 'girls', 'centers', 'ends', 'leads', 'trailers', 'beaus', 'belles'];

export type ParsedStep = {
  rawLine: string;
  type: 'call' | 'activator' | 'filler' | 'warning' | 'tip' | 'recovery';
  designator?: string;
  count?: number;
  callMatches: { callId: number; name: string; confidence: number }[];
  formationMatches: { startId: number; name: string }[];
  resolution: 'resolved' | 'unresolved' | 'ambiguous';
  text?: string;
};

function classifyLine(line: string): { type: ParsedStep['type']; text: string } {
  if (line.startsWith('//') || line.startsWith('#')) return { type: 'warning', text: line.replace(/^\/\/\s*|^#\s*/, '') };
  if (line.startsWith('[tip]')) return { type: 'tip', text: line.slice(5).trim() };
  if (line.startsWith('[filler]')) return { type: 'filler', text: line.slice(8).trim() };
  if (line.startsWith('[recovery]')) return { type: 'recovery', text: line.slice(10).trim() };
  if (line.startsWith('[warning]')) return { type: 'warning', text: line.slice(9).trim() };
  if (DESIGNATORS.includes(line.split(/\s+/)[0])) {
    const first = line.split(/\s+/)[0];
    if (first === 'heads' || first === 'sides') {
      const rest = line.slice(first.length).trim();
      if (rest === '') return { type: 'activator', text: first };
    }
  }
  return { type: 'call', text: line };
}

function extractCount(text: string): { text: string; count?: number } {
  const match = text.match(/\s+(\d+)\s*$/);
  if (match) {
    return { text: text.slice(0, match.index).trim(), count: parseInt(match[1], 10) };
  }
  return { text };
}

function extractDesignator(text: string): { text: string; designator?: string } {
  const first = text.split(/\s+/)[0].toLowerCase();
  if (DESIGNATORS.includes(first)) {
    return { designator: first, text: text.slice(first.length).trim() };
  }
  return { text };
}

export async function parseSequenceText(rawText: string): Promise<ParsedStep[]> {
  const lines = rawText
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  const results: ParsedStep[] = [];

  for (const line of lines) {
    const normalized = line.toLowerCase().replace(/\s+/g, ' ').trim();
    const { type, text: classified } = classifyLine(normalized);

    if (type !== 'call') {
      results.push({ rawLine: line, type, text: classified, callMatches: [], formationMatches: [], resolution: 'resolved' });
      continue;
    }

    const { text: afterDesignator, designator } = extractDesignator(classified);
    const { text: callText, count } = extractCount(afterDesignator);

    // Lookup by name or synonym
    const byName = await prisma.call.findMany({ where: { name: { equals: callText, mode: 'insensitive' } } });
    const bySynonym = await prisma.call_synonym.findMany({
      where: { alias: { equals: callText, mode: 'insensitive' } },
      include: { call: true },
    });

    const callMatches = [
      ...byName.map((c) => ({ callId: c.callId, name: c.name, confidence: 1 })),
      ...bySynonym
        .filter((s) => !byName.find((c) => c.callId === s.callId))
        .map((s) => ({ callId: s.callId, name: s.call.name, confidence: 0.9 })),
    ];

    let resolution: ParsedStep['resolution'];
    if (callMatches.length === 0) resolution = 'unresolved';
    else if (callMatches.length === 1) resolution = 'resolved';
    else resolution = 'ambiguous';

    // Formation matches for resolved call
    const formationMatches: { startId: number; name: string }[] = [];
    if (resolution === 'resolved' && callMatches.length === 1) {
      const formations = await prisma.call_formation.findMany({
        where: { callId: callMatches[0].callId },
        include: { startForm: true },
      });
      formationMatches.push(...formations.map((f) => ({ startId: f.startId, name: f.startForm.name })));
    }

    results.push({ rawLine: line, type, designator, count, callMatches, formationMatches, resolution });
  }

  return results;
}
