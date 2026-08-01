// Types for the sequence-import editor. The first block mirrors the backend
// parser output (be/src/service/parser.ts); FE and BE are separate packages, so
// the API contract is duplicated here by necessity. The second block is the
// client-side draft state for the two-layer choreo-module + presentation model
// (issue #70): a presentation-free choreo layer interleaved with cueing text.

export type Resolution = 'resolved' | 'unresolved' | 'ambiguous';
export type TextType = 'activator' | 'filler' | 'tip' | 'warning' | 'recovery';

export type CallMatch = { callId: number; name: string; confidence: number };
export type FormationMatch = { startId: number; name: string };

// ---- Parser output (POST /api/sequence/parse) -----------------------------

export type ParsedModuleStep = {
  order: number;
  rawLine: string;
  callText: string; // cleaned call name the parser matched on; prefilled into quick-add
  designator?: string;
  count?: number;
  callMatches: CallMatch[];
  formationMatches: FormationMatch[];
  resolution: Resolution;
  callId?: number;
  startId?: number;
};

export type ParsedPresentationItem =
  | { order: number; type: 'module_ref'; steps: { stepOrder: number; textBefore?: string }[] }
  | { order: number; type: 'text'; textType: TextType; text: string };

export type ParsedDraft = {
  name?: string; // from a first-row [Title]
  activator?: 'heads' | 'sides'; // from a {heads/sides} toggle line
  module: { steps: ParsedModuleStep[] };
  presentation: { sourceText: string; items: ParsedPresentationItem[] };
};

// ---- Loaded presentation (GET /api/presentation/:id) ----------------------
// The nested read shape used to hydrate the editor when re-opening a saved
// sequence. Mirrors be/src/service/presentation shapeItem.

export type LoadedModuleStep = {
  order: number;
  callId: number | null;
  startId: number | null;
  designator: string | null;
  count: number | null;
  warning: string | null;
  call: { name: string | null } | null;
};

export type LoadedItemStep = {
  stepOrder: number;
  textBefore: string | null;
  textAfter: string | null;
  callNameAlternate: string | null;
  warning: string | null;
  helperText: string | null;
  moduleStep: LoadedModuleStep | null;
};

export type LoadedItem = {
  id: number;
  order: number;
  type: 'module_ref' | 'text';
  moduleId: number | null;
  text: string | null;
  textType: TextType | null;
  module: { id: number; name: string; startFormId: number | null; endFormId: number | null; isValid: boolean } | null;
  steps: LoadedItemStep[];
};

export type LoadedPresentation = {
  id: number;
  name: string;
  status: string;
  source: string | null;
  activator: string | null;
  rating: string | null;
  notes: string | null;
  sourceText: string | null;
  items: LoadedItem[];
};

// ---- Client draft state ---------------------------------------------------

// Choreographic — no spoken text. Maps to choreo_module_step on save.
export type DraftModuleStep = {
  localId: string;
  order: number;
  callId: number | null;
  startId: number | null;
  callText: string; // cleaned call name from the parser; quick-add prefill / synonym alias
  designator: string | null;
  count: number | null;
  warning: string | null; // inherent choreographic warning (#70)
  resolution: Resolution;
  rawLine: string;
  callMatches: CallMatch[];
  formationMatches: FormationMatch[];
};

// One choreo step's presentation decoration inside a module_ref item.
export type DraftModuleRefStep = {
  stepOrder: number; // links to DraftModuleStep.order
  textBefore: string | null;
  textAfter: string | null;
  callNameAlternate: string | null;
  warning: string | null; // contextual warning (#70)
  helperText: string | null; // caller-private; never shown to dancers
};

// Presentation — interleaved ordered slots. Maps to presentation_item on save.
export type DraftPresentationItem =
  | { localId: string; order: number; type: 'module_ref'; steps: DraftModuleRefStep[] }
  | { localId: string; order: number; type: 'text'; textType: TextType; text: string };

export type DraftImport = {
  presentationId: number | null; // set after step-1 raw save
  moduleId: number | null;       // set after module save
  isValid: boolean;              // set after module save; gates Activate
  // presentation-layer meta
  name: string;
  source: string | null; // taminations | callerlab | personal | <caller>
  activator: 'heads' | 'sides' | null;
  rating: string | null;
  notes: string | null;
  sourceText: string;
  // choreo-layer meta
  startFormationId: number; // default: Squared Set
  teachOrderId: number | null;
  moduleSteps: DraftModuleStep[];
  presentationItems: DraftPresentationItem[];
};

// Resolve a step's display call name from its chosen callId. The chosen call is
// always present in callMatches (parser match, or pushed there on quick-add), so
// names don't need to be stored separately on the draft.
export function resolvedCallName(step: DraftModuleStep): string | null {
  if (step.callId == null) return null;
  return step.callMatches.find((m) => m.callId === step.callId)?.name ?? null;
}

// Resolve a step's display start-formation name from its chosen startId.
export function resolvedFormationName(step: DraftModuleStep): string | null {
  if (step.startId == null) return null;
  return step.formationMatches.find((m) => m.startId === step.startId)?.name ?? null;
}
