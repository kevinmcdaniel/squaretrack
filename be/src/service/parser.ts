import { prisma } from '../database.js';

const DESIGNATORS = ['heads', 'sides', 'boys', 'girls', 'centers', 'ends', 'leads', 'trailers', 'beaus', 'belles'];

// Leading words that are spoken filler, not part of the call name. Stripped into
// the presentation layer (textBefore) so the choreographic call text stays clean.
const FILLER_PREFIXES = ['and', 'then', 'now', 'go', 'ok', 'okay', 'easy'];

// A choreographic step draft: a call resolved (or not) from the pasted text.
// Contains no spoken text — that lives on the presentation draft.
export type ParsedModuleStep = {
  order: number;
  rawLine: string;
  // The call name after stripping designator, count, and spoken filler — the exact
  // text matched against call.name / call_synonym.alias. The import editor prefills
  // it into quick-add when a line does not resolve.
  callText: string;
  designator?: string;
  count?: number;
  callMatches: { callId: number; name: string; confidence: number }[];
  formationMatches: { startId: number; name: string }[];
  resolution: 'resolved' | 'unresolved' | 'ambiguous';
  callId?: number; // set when exactly one call matches
  startId?: number; // set when exactly one start formation matches
};

export type ParsedPresentationItem =
  | { order: number; type: 'module_ref'; steps: { stepOrder: number; textBefore?: string }[] }
  | { order: number; type: 'text'; textType: 'activator' | 'filler' | 'tip' | 'warning' | 'recovery'; text: string };

// The two-layer parse result: a presentation-free choreo module draft plus a
// presentation draft wrapping it with cueing text (issue #70).
export type ParsedDraft = {
  module: { steps: ParsedModuleStep[] };
  presentation: { sourceText: string; items: ParsedPresentationItem[] };
};

// Classify a line by its leading marker. Detection is case-insensitive, but the
// returned `text` keeps the caller's original casing so the presentation layer
// stores it verbatim — a "[warning] STOP" stays "STOP".
function classifyLine(line: string): { type: 'call' | 'activator' | 'filler' | 'warning' | 'tip' | 'recovery'; text: string } {
  const lower = line.toLowerCase();
  if (lower.startsWith('//') || lower.startsWith('#')) return { type: 'warning', text: line.replace(/^\/\/\s*|^#\s*/, '') };
  if (lower.startsWith('[tip]')) return { type: 'tip', text: line.slice(5).trim() };
  if (lower.startsWith('[filler]')) return { type: 'filler', text: line.slice(8).trim() };
  if (lower.startsWith('[recovery]')) return { type: 'recovery', text: line.slice(10).trim() };
  if (lower.startsWith('[warning]')) return { type: 'warning', text: line.slice(9).trim() };
  if (lower === 'heads' || lower === 'sides') return { type: 'activator', text: line };
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

// Pull leading spoken-filler words ("and", "now", …) off the call text so they
// can be carried on the presentation layer as textBefore. Always leaves at least
// one word for the call name itself.
function extractTextBefore(text: string): { text: string; textBefore?: string } {
  const words = text.split(/\s+/);
  const taken: string[] = [];
  while (words.length > 1 && FILLER_PREFIXES.includes(words[0].toLowerCase())) {
    taken.push(words.shift()!);
  }
  if (taken.length === 0) return { text };
  return { text: words.join(' '), textBefore: taken.join(' ') };
}

export async function parseSequenceText(rawText: string): Promise<ParsedDraft> {
  const lines = rawText
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  const moduleSteps: ParsedModuleStep[] = [];
  const items: ParsedPresentationItem[] = [];

  let itemOrder = 0;
  let pendingDecoration: { stepOrder: number; textBefore?: string }[] = [];

  // Flush the in-progress run of calls into one module_ref item, so text items
  // keep their original position relative to the calls around them.
  const flushModuleRef = () => {
    if (pendingDecoration.length > 0) {
      items.push({ order: itemOrder++, type: 'module_ref', steps: pendingDecoration });
      pendingDecoration = [];
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.replace(/\s+/g, ' ').trim(); // collapse whitespace, keep case
    const { type, text } = classifyLine(line);

    if (type !== 'call') {
      flushModuleRef();
      items.push({ order: itemOrder++, type: 'text', textType: type, text });
      continue;
    }

    // Strip spoken filler both before and after the designator. The designator
    // must still be recognized (it drives call resolution); the filler is kept,
    // in source order, on the presentation layer as textBefore.
    const { text: afterPreFiller, textBefore: preFiller } = extractTextBefore(text);
    const { text: afterDesignator, designator } = extractDesignator(afterPreFiller);
    const { text: afterPostFiller, textBefore: postFiller } = extractTextBefore(afterDesignator);
    const { text: callText, count } = extractCount(afterPostFiller);
    const textBefore = [preFiller, postFiller].filter(Boolean).join(' ') || undefined;

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

    let resolution: ParsedModuleStep['resolution'];
    if (callMatches.length === 0) resolution = 'unresolved';
    else if (callMatches.length === 1) resolution = 'resolved';
    else resolution = 'ambiguous';

    const formationMatches: { startId: number; name: string }[] = [];
    if (resolution === 'resolved') {
      const formations = await prisma.call_formation.findMany({
        where: { callId: callMatches[0].callId },
        include: { startForm: true },
      });
      formationMatches.push(...formations.map((f) => ({ startId: f.startId, name: f.startForm.name })));
    }

    const stepOrder = moduleSteps.length;
    moduleSteps.push({
      order: stepOrder,
      rawLine,
      callText,
      designator,
      count,
      callMatches,
      formationMatches,
      resolution,
      callId: callMatches.length === 1 ? callMatches[0].callId : undefined,
      startId: formationMatches.length === 1 ? formationMatches[0].startId : undefined,
    });
    pendingDecoration.push({ stepOrder, ...(textBefore ? { textBefore } : {}) });
  }

  flushModuleRef();

  return { module: { steps: moduleSteps }, presentation: { sourceText: rawText, items } };
}
