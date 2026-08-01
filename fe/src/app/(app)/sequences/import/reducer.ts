import type {
  DraftImport,
  DraftModuleRefStep,
  DraftModuleStep,
  DraftPresentationItem,
  LoadedPresentation,
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

// Locked = the sequence has been activated (status 'active'): its choreography is
// committed, so the editor permits text/metadata edits only. A draft — even one that
// already has a saved (WIP) module — stays fully editable while you fix it.
export function presentationIsLocked(p: LoadedPresentation): boolean {
  return p.status === 'active';
}

// Hydrate the editor from a saved presentation (GET /api/presentation/:id) for
// re-edit. The editor models a single choreo module — all the import flow
// produces — so steps come from the first module_ref item; text items and per-step
// cueing decorations carry over verbatim. callMatches is seeded from the resolved
// call name so labels render the current selection without a catalog lookup.
export function hydrateDraftFromPresentation(
  p: LoadedPresentation,
  fallbackStartFormationId: number,
): DraftImport {
  const moduleRef = p.items.find((i) => i.type === 'module_ref' && i.moduleId != null);

  const moduleSteps: DraftModuleStep[] = (moduleRef?.steps ?? []).map((st) => {
    const ms = st.moduleStep;
    const callId = ms?.callId ?? null;
    const startId = ms?.startId ?? null;
    const callName = ms?.call?.name ?? null;
    return {
      localId: uid(),
      order: st.stepOrder,
      callId,
      startId,
      callText: callName ?? '',
      designator: ms?.designator ?? null,
      count: ms?.count ?? null,
      warning: ms?.warning ?? null,
      resolution: callId != null && startId != null ? 'resolved' : 'unresolved',
      rawLine: '',
      callMatches: callId != null && callName ? [{ callId, name: callName, confidence: 1 }] : [],
      formationMatches: startId != null ? [{ startId, name: '' }] : [],
    };
  });

  const presentationItems: DraftPresentationItem[] = p.items.map((item) => {
    if (item.type === 'text') {
      return { localId: uid(), order: item.order, type: 'text', textType: item.textType ?? 'filler', text: item.text ?? '' };
    }
    return {
      localId: uid(),
      order: item.order,
      type: 'module_ref',
      steps: item.steps.map((st) => ({
        stepOrder: st.stepOrder,
        textBefore: st.textBefore,
        textAfter: st.textAfter,
        callNameAlternate: st.callNameAlternate,
        warning: st.warning,
        helperText: st.helperText,
      })),
    };
  });

  return {
    presentationId: p.id,
    moduleId: moduleRef?.moduleId ?? null,
    isValid: moduleRef?.module?.isValid ?? false,
    name: p.name ?? '',
    source: p.source,
    activator: (p.activator as DraftImport['activator']) ?? null,
    rating: p.rating,
    notes: p.notes,
    sourceText: p.sourceText ?? '',
    startFormationId: moduleRef?.module?.startFormId ?? fallbackStartFormationId,
    teachOrderId: null,
    moduleSteps,
    presentationItems,
  };
}

export type ImportAction =
  | { type: 'SET_DRAFT'; parsed: ParsedDraft }
  | { type: 'UPDATE_MODULE_STEP'; localId: string; patch: Partial<DraftModuleStep> }
  | { type: 'SPLIT_MODULE_STEP'; localId: string; pieces: string[] }
  | { type: 'REMOVE_MODULE_STEP'; localId: string }
  | { type: 'MERGE_MODULE_STEP'; localId: string }
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

// A brand-new unresolved step minted by a line-split. Choreographic fields start
// empty; the caller resolves call + formation through the picker.
function freshStep(callText: string): DraftModuleStep {
  return {
    localId: uid(),
    order: 0, // renumbered by the reducer
    callId: null,
    startId: null,
    callText: callText.trim(),
    designator: null,
    count: null,
    warning: null,
    resolution: 'unresolved',
    rawLine: '',
    callMatches: [],
    formationMatches: [],
  };
}

// Drop the decoration for a removed step and close the gap in stepOrder, keeping
// the module_ref item aligned with the renumbered moduleSteps.
function removeStepDecoration(items: DraftPresentationItem[], removedOrder: number): DraftPresentationItem[] {
  return items.map((item) => {
    if (item.type !== 'module_ref') return item;
    const steps = item.steps
      .filter((st) => st.stepOrder !== removedOrder)
      .map((st) => (st.stepOrder > removedOrder ? { ...st, stepOrder: st.stepOrder - 1 } : st));
    return { ...item, steps };
  });
}

export function importReducer(state: DraftImport, action: ImportAction): DraftImport {
  switch (action.type) {
    case 'SET_DRAFT':
      return {
        ...state,
        sourceText: action.parsed.presentation.sourceText,
        // A first-row [Title] names the sequence (unless the caller already named
        // it); a {heads/sides} line sets the toggle activator.
        ...(action.parsed.name && !state.name ? { name: action.parsed.name } : {}),
        ...(action.parsed.activator ? { activator: action.parsed.activator } : {}),
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

    // Split one parsed step into several calls (e.g. "sides face, grand square").
    // Both layers renumber together: moduleSteps re-order 0..n by position, and the
    // module_ref decorations shift past the split point with empty decos for the new
    // pieces — the first piece keeps the original step's cueing text.
    case 'SPLIT_MODULE_STEP': {
      const idx = state.moduleSteps.findIndex((s) => s.localId === action.localId);
      if (idx === -1) return state;
      const pieces = action.pieces.map((p) => p.trim()).filter(Boolean);
      if (pieces.length < 2) return state;

      const splitOrder = state.moduleSteps[idx]!.order;
      const inserted = pieces.length - 1;

      const moduleSteps = [
        ...state.moduleSteps.slice(0, idx),
        ...pieces.map(freshStep),
        ...state.moduleSteps.slice(idx + 1),
      ].map((s, i) => ({ ...s, order: i }));

      const presentationItems = state.presentationItems.map((item) => {
        if (item.type !== 'module_ref') return item;
        const shifted = item.steps.map((st) =>
          st.stepOrder > splitOrder ? { ...st, stepOrder: st.stepOrder + inserted } : st,
        );
        const added: DraftModuleRefStep[] = Array.from({ length: inserted }, (_, k) => ({
          stepOrder: splitOrder + 1 + k,
          textBefore: null,
          textAfter: null,
          callNameAlternate: null,
          warning: null,
          helperText: null,
        }));
        return { ...item, steps: [...shifted, ...added].sort((a, b) => a.stepOrder - b.stepOrder) };
      });

      return { ...state, moduleSteps, presentationItems };
    }

    // Remove a step (the safety net for a bad parse / over-split). Both layers
    // renumber to close the gap.
    case 'REMOVE_MODULE_STEP': {
      const idx = state.moduleSteps.findIndex((s) => s.localId === action.localId);
      if (idx === -1) return state;
      const removedOrder = state.moduleSteps[idx]!.order;
      const moduleSteps = state.moduleSteps.filter((_, i) => i !== idx).map((s, i) => ({ ...s, order: i }));
      return { ...state, moduleSteps, presentationItems: removeStepDecoration(state.presentationItems, removedOrder) };
    }

    // Un-split: merge a step back into the previous one (the inverse of split). The
    // combined text becomes a fresh unresolved call to re-pick.
    case 'MERGE_MODULE_STEP': {
      const idx = state.moduleSteps.findIndex((s) => s.localId === action.localId);
      if (idx <= 0) return state; // the first step has nothing to merge into
      const cur = state.moduleSteps[idx]!;
      const removedOrder = cur.order;
      const mergedText = [state.moduleSteps[idx - 1]!.callText, cur.callText]
        .map((t) => t.trim())
        .filter(Boolean)
        .join(', ');
      const moduleSteps = state.moduleSteps
        .map((s, i) =>
          i === idx - 1
            ? {
                ...s,
                callText: mergedText,
                callId: null,
                startId: null,
                designator: null,
                count: null,
                callMatches: [],
                formationMatches: [],
                resolution: 'unresolved' as const,
              }
            : s,
        )
        .filter((_, i) => i !== idx)
        .map((s, i) => ({ ...s, order: i }));
      return { ...state, moduleSteps, presentationItems: removeStepDecoration(state.presentationItems, removedOrder) };
    }

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
