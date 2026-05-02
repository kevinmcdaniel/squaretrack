import { prisma } from '../database.js';

export type ParsedEntry = {
  rawLine: string;
  displayOrder: string | null;
  entryType: 'family' | 'call';
  label: string;
  callMatches: { callId: number; name: string }[];
  formationMatches: { startId: number; name: string; difficulty: string }[];
  resolution: 'resolved' | 'unresolved' | 'ambiguous';
};

function stripVariants(text: string): string {
  return text.replace(/\s*\([^)]*\)/g, '').trim();
}

function parsePosition(line: string): { position: number | null; subLetter: string | null; rest: string } {
  // Numbered top-level: "10. Right and Left Thru"
  const numbered = line.match(/^(\d+)\.\s*(.*)/);
  if (numbered) return { position: parseInt(numbered[1], 10), subLetter: null, rest: numbered[2] };

  // Lettered sub-entry: "a. Circle Left/Right"
  const lettered = line.match(/^([a-z])\.\s*(.*)/i);
  if (lettered) return { position: null, subLetter: lettered[1].toLowerCase(), rest: lettered[2] };

  return { position: null, subLetter: null, rest: line };
}

function isFamily(text: string): boolean {
  return /family$/i.test(text.trim());
}

function splitLeftRight(text: string): string[] {
  // "Circle Left/Right" → ["Circle Left", "Circle Right"]
  return text.split('/').map((part, i, arr) => {
    if (i === 0) return part.trim();
    const baseParts = arr[0].trim().split(/\s+/);
    baseParts[baseParts.length - 1] = part.trim();
    return baseParts.join(' ');
  });
}

export async function parseTeachOrderText(
  rawText: string,
  programId: number
): Promise<ParsedEntry[]> {
  const lines = rawText
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  const results: ParsedEntry[] = [];
  let currentPosition: number | null = null;

  for (const line of lines) {
    const normalized = line.toLowerCase().replace(/\s+/g, ' ').trim();
    const { position, subLetter, rest } = parsePosition(normalized);

    if (position !== null) currentPosition = position;
    const effectivePosition = position ?? currentPosition;

    let displayOrder: string | null = null;
    if (effectivePosition !== null) {
      displayOrder = subLetter ? `${effectivePosition}${subLetter}` : String(effectivePosition);
    }

    const cleanText = stripVariants(rest);

    if (isFamily(cleanText)) {
      results.push({
        rawLine: line,
        displayOrder,
        entryType: 'family',
        label: cleanText,
        callMatches: [],
        formationMatches: [],
        resolution: 'resolved',
      });
      continue;
    }

    // Expand "Left/Right" patterns into separate call lookups
    const callNames = cleanText.includes('/')
      ? splitLeftRight(cleanText)
      : [cleanText];

    const allCallMatches: { callId: number; name: string }[] = [];
    for (const callName of callNames) {
      const byName = await prisma.call.findMany({
        where: { name: { equals: callName, mode: 'insensitive' } },
      });
      const bySynonym = await prisma.call_synonym.findMany({
        where: { alias: { equals: callName, mode: 'insensitive' } },
        include: { call: true },
      });
      const merged = [
        ...byName.map((c) => ({ callId: c.callId, name: c.name })),
        ...bySynonym
          .filter((s) => !byName.find((c) => c.callId === s.callId))
          .map((s) => ({ callId: s.callId, name: s.call.name })),
      ];
      allCallMatches.push(...merged);
    }

    const seen = new Set<number>();
    const callMatches = allCallMatches.filter((m) => {
      if (seen.has(m.callId)) return false;
      seen.add(m.callId);
      return true;
    });

    let resolution: ParsedEntry['resolution'];
    if (callMatches.length === 0) resolution = 'unresolved';
    else if (callMatches.length === callNames.length) resolution = 'resolved';
    else resolution = 'ambiguous';

    const formationMatches: { startId: number; name: string; difficulty: string }[] = [];
    for (const match of callMatches) {
      const pcfs = await prisma.program_call_formation.findMany({
        where: { programId, callId: match.callId },
        include: { callFormation: { include: { startForm: true } } },
      });
      formationMatches.push(
        ...pcfs.map((p) => ({
          startId: p.startId,
          name: p.callFormation.startForm.name,
          difficulty: p.difficulty,
        }))
      );
    }

    results.push({
      rawLine: line,
      displayOrder,
      entryType: 'call',
      label: cleanText,
      callMatches,
      formationMatches,
      resolution,
    });
  }

  return results;
}
