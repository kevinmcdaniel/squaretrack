import type {
  DraftImport,
  DraftModuleRefStep,
  DraftModuleStep,
  DraftPresentationItem,
  ParsedDraft,
  Resolution,
  TextType,
} from './types';

// localId only needs to be unique within this client session (React keys + draft
// addressing). crypto.randomUUID() is unavailable outside secure contexts (non-localhost
// HTTP), so fall back to a non-crypto id rather than throwing and crashing the editor.
const uid = (): string =>
  globalThis.crypto?.randomUUID?.() ??
  `id-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;

// Re-derive a module step's resolution from its current matches and selection.
// Called after a quick-add or pick so a row flips out of the red unresolved state
// the moment a single call resolves it.
export function deriveResolution(step: Pick<DraftModuleStep, 'callId' | 'callMatches'>): Resolution {
  if (step.callId != null) return 'resolved';
  if (step.callMatches.length === 0) return 'unresolved';
  if (step.callMatches.length === 1) return 'resolved';
  return 'ambiguous';
}

// Map the stateless parse result into editable draft state, minting localIds for
// React keys and lifting the parser's optional fields into explicit nulls.
export function hydrateModuleSteps(parsed: ParsedDraft): DraftModuleStep[] {
  return parsed.module.steps.map((s) => ({
    localId: uid(),
    order: s.order,
    callId: s.callId ?? null,
    startId: s.startId ?? null,
    callText: s.callText,
    designator: s.designator ?? null,
    count: s.count ?? null,
    warning: null,
    resolution: s.resolution,
    rawLine: s.rawLine,
    callMatches: s.callMatches,
    formationMatches: s.formationMatches,
  }));
}

export function hydratePresentationItems(parsed: ParsedDraft): DraftPresentationItem[] {
  return parsed.presentation.items.map((item) => {
    if (item.type === 'text') {
      return { localId: uid(), order: item.order, type: 'text', textType: item.textType, text: item.text };
    }
    return {
      localId: uid(),
      order: item.order,
      type: 'module_ref',
      steps: item.steps.map((st) => ({
        stepOrder: st.stepOrder,
        textBefore: st.textBefore ?? null,
        textAfter: null,
        callNameAlternate: null,
        warning: null,
        helperText: null,
      })),
    };
  });
}

export type ImportAction =
  | { type: 'SET_DRAFT'; parsed: ParsedDraft }
  | { type: 'UPDATE_MODULE_STEP'; localId: string; patch: Partial<DraftModuleStep> }
  // Edits a top-level text item, or (with stepOrder) one module_ref step's decoration.
  | { type: 'UPDATE_PRESENTATION_ITEM'; localId: string; stepOrder?: number; patch: Partial<DraftModuleRefStep> & { text?: string; textType?: TextType } }
  | { type: 'ADD_PRESENTATION_TEXT'; afterOrder: number; textType: TextType }
  | { type: 'DELETE_ITEM'; localId: string }
  | { type: 'REORDER_ITEM'; localId: string; direction: 'up' | 'down' }
  | { type: 'SET_META'; patch: Partial<DraftImport> };

// Renumber items 0..n by array position so `order` always reflects render order
// after an add / delete / reorder.
function resequence(items: DraftPresentationItem[]): DraftPresentationItem[] {
  return items.map((item, i) => ({ ...item, order: i }));
}

export function importReducer(state: DraftImport, action: ImportAction): DraftImport {
  switch (action.type) {
    case 'SET_DRAFT':
      return {
        ...state,
        sourceText: action.parsed.presentation.sourceText,
        moduleSteps: hydrateModuleSteps(action.parsed),
        presentationItems: hydratePresentationItems(action.parsed),
      };

    case 'UPDATE_MODULE_STEP':
      return {
        ...state,
        moduleSteps: state.moduleSteps.map((s) =>
          s.localId === action.localId ? { ...s, ...action.patch } : s,
        ),
      };

    case 'UPDATE_PRESENTATION_ITEM':
      return {
        ...state,
        presentationItems: state.presentationItems.map((item) => {
          if (item.localId !== action.localId) return item;
          if (item.type === 'text') {
            const { text, textType } = action.patch;
            return { ...item, ...(text !== undefined ? { text } : {}), ...(textType !== undefined ? { textType } : {}) };
          }
          // module_ref: patch the addressed step's decoration
          if (action.stepOrder === undefined) return item;
          return {
            ...item,
            steps: item.steps.map((st) =>
              st.stepOrder === action.stepOrder ? { ...st, ...action.patch } : st,
            ),
          };
        }),
      };

    case 'ADD_PRESENTATION_TEXT': {
      const insertAt = state.presentationItems.findIndex((i) => i.order === action.afterOrder) + 1;
      const next: DraftPresentationItem = {
        localId: uid(),
        order: 0, // resequenced below
        type: 'text',
        textType: action.textType,
        text: '',
      };
      const items = [...state.presentationItems];
      items.splice(insertAt, 0, next);
      return { ...state, presentationItems: resequence(items) };
    }

    case 'DELETE_ITEM':
      return {
        ...state,
        presentationItems: resequence(
          state.presentationItems.filter((i) => i.localId !== action.localId),
        ),
      };

    case 'REORDER_ITEM': {
      const idx = state.presentationItems.findIndex((i) => i.localId === action.localId);
      if (idx === -1) return state;
      const swap = action.direction === 'up' ? idx - 1 : idx + 1;
      if (swap < 0 || swap >= state.presentationItems.length) return state;
      const items = [...state.presentationItems];
      [items[idx], items[swap]] = [items[swap], items[idx]];
      return { ...state, presentationItems: resequence(items) };
    }

    case 'SET_META':
      return { ...state, ...action.patch };

    default:
      return state;
  }
}

export function emptyDraft(startFormationId: number): DraftImport {
  return {
    presentationId: null,
    moduleId: null,
    isValid: false,
    name: '',
    source: null,
    activator: null,
    rating: null,
    notes: null,
    sourceText: '',
    startFormationId,
    teachOrderId: null,
    moduleSteps: [],
    presentationItems: [],
  };
}
