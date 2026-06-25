'use client';

import { useEffect, useMemo, useReducer, useRef, useState } from 'react';
import {
  formationsForCall,
  listCalls,
  listFormations,
  pasteAndParse,
  parseOnly,
  saveImport,
  activatePresentation,
  type CallOption,
  type FormationOption,
  type SaveImportInput,
} from './actions';
import { FooterBar, type SaveOutcome } from './FooterBar';
import { MetaForm, type FormationLite } from './MetaForm';
import { PasteDropzone } from './PasteDropzone';
import { StepList } from './StepList';
import { type StepRowHandlers, stepNeedsAttention } from './StepRow';
import { UnresolvedBanner } from './UnresolvedBanner';
import type { LoadedPresentation } from './types';
import { emptyDraft, hydrateDraftFromPresentation, importReducer, presentationIsLinked } from './reducer';

export function SequenceImport({
  formations,
  startFormationId,
  initialPresentation,
}: {
  formations: FormationLite[];
  startFormationId: number;
  initialPresentation?: LoadedPresentation;
}) {
  // A presentation with a module_ref item is linked to choreography: the calls
  // render read-only and the raw paste box is hidden (#20 lifecycle gate).
  const linked = initialPresentation ? presentationIsLinked(initialPresentation) : false;

  // Lazy init (runs once): hydrate a saved presentation that already has items;
  // otherwise start empty, carrying a raw draft's id + sourceText for parse-on-load.
  const [draft, dispatch] = useReducer(importReducer, initialPresentation, (p) => {
    if (p && p.items.length > 0) return hydrateDraftFromPresentation(p, startFormationId);
    const d = emptyDraft(startFormationId);
    if (p) {
      d.presentationId = p.id;
      d.sourceText = p.sourceText ?? '';
    }
    return d;
  });
  const [callOptions, setCallOptions] = useState<CallOption[]>([]);
  const [allFormations, setAllFormations] = useState<FormationOption[]>([]);
  const autoParsed = useRef(false);

  useEffect(() => {
    let live = true;
    void (async () => {
      const [calls, forms] = await Promise.all([listCalls(), listFormations()]);
      if (!live) return;
      if (calls.ok) setCallOptions(calls.data);
      if (forms.ok) setAllFormations(forms.data);
    })();
    return () => { live = false; };
  }, []);

  // Parse-on-load: when re-opening a saved draft (?presentationId=N) whose raw text
  // has not yet been parsed, run the parser once so the step review is immediately
  // visible. parseOnly (not pasteAndParse) preserves the existing presentationId.
  useEffect(() => {
    if (autoParsed.current) return;
    if (initialPresentation == null) return;
    const text = (initialPresentation.sourceText ?? '').trim();
    if (!text) return;
    if (draft.moduleSteps.length > 0 || draft.presentationItems.length > 0) return;
    autoParsed.current = true;
    void (async () => {
      const res = await parseOnly(text);
      if (res.ok) dispatch({ type: 'SET_DRAFT', parsed: res.data });
    })();
  }, [initialPresentation, draft.moduleSteps.length, draft.presentationItems.length]);

  const stepsByOrder = useMemo(
    () => new Map(draft.moduleSteps.map((s) => [s.order, s])),
    [draft.moduleSteps],
  );
  const unresolvedCount = useMemo(
    () => draft.moduleSteps.filter(stepNeedsAttention).length,
    [draft.moduleSteps],
  );
  const hasDraft = draft.moduleSteps.length > 0 || draft.presentationItems.length > 0;

  const handleParse = async (text: string): Promise<string | null> => {
    const bracketName = /^\s*\[([^\]]+)\]\s*$/m.exec(text)?.[1]?.trim() ?? null;
    const result = await pasteAndParse({ name: draft.name || bracketName || '', sourceText: text });
    if (!result.ok) return result.error;
    dispatch({ type: 'SET_DRAFT', parsed: result.data.draft });
    dispatch({ type: 'SET_META', patch: {
      presentationId: result.data.presentationId,
      moduleId: null,
      isValid: false,
      ...(bracketName && !draft.name ? { name: bracketName } : {}),
    }});
    return null;
  };

  const loadFormationsInto = async (callId: number, localIds: string[]) => {
    const res = await formationsForCall(callId);
    if (!res.ok) return;
    for (const id of localIds) {
      dispatch({
        type: 'UPDATE_MODULE_STEP',
        localId: id,
        patch: { formationMatches: res.data, startId: res.data.length === 1 ? res.data[0].startId : null },
      });
    }
  };

  const handlers: StepRowHandlers = {
    onResolveCall: (localId, call, applyToSiblings) => {
      const target = draft.moduleSteps.find((s) => s.localId === localId);
      if (!target) return;
      const key = target.callText.trim().toLowerCase();
      const ids = applyToSiblings
        ? draft.moduleSteps
            .filter((s) => s.resolution !== 'resolved' && s.callText.trim().toLowerCase() === key)
            .map((s) => s.localId)
        : [localId];
      const idSet = ids.includes(localId) ? ids : [localId, ...ids];

      for (const id of idSet) {
        const s = draft.moduleSteps.find((x) => x.localId === id);
        if (!s) continue;
        const callMatches = s.callMatches.some((m) => m.callId === call.callId)
          ? s.callMatches
          : [...s.callMatches, { callId: call.callId, name: call.name, confidence: 1 }];
        dispatch({
          type: 'UPDATE_MODULE_STEP',
          localId: id,
          patch: { callId: call.callId, callMatches, resolution: 'resolved', startId: null, formationMatches: [] },
        });
      }
      void loadFormationsInto(call.callId, idSet);
    },

    onCatalogAddCall: (call) => {
      setCallOptions((prev) => (prev.some((c) => c.callId === call.callId) ? prev : [...prev, call]));
    },

    onPickFormation: (localId, opt) => {
      const s = draft.moduleSteps.find((x) => x.localId === localId);
      const formationMatches =
        s && s.formationMatches.some((m) => m.startId === opt.startId)
          ? s.formationMatches
          : [...(s?.formationMatches ?? []), opt];
      dispatch({ type: 'UPDATE_MODULE_STEP', localId, patch: { startId: opt.startId, formationMatches } });
    },

    onSplitStep: (localId, pieces) => dispatch({ type: 'SPLIT_MODULE_STEP', localId, pieces }),
    onRemoveStep: (localId) => dispatch({ type: 'REMOVE_MODULE_STEP', localId }),
    onMergeStep: (localId) => dispatch({ type: 'MERGE_MODULE_STEP', localId }),
  };

  const handleSaveDraft = async (): Promise<SaveOutcome> => {
    const payload: SaveImportInput = {
      presentationId: draft.presentationId,
      name: draft.name,
      source: draft.source,
      activator: draft.activator,
      rating: draft.rating,
      notes: draft.notes,
      sourceText: draft.sourceText,
      startFormationId: draft.startFormationId,
      teachOrderId: draft.teachOrderId,
      moduleSteps: draft.moduleSteps.map((s) => ({
        order: s.order,
        callId: s.callId,
        startId: s.startId,
        designator: s.designator,
        count: s.count,
        warning: s.warning,
      })),
      items: draft.presentationItems.map((it) =>
        it.type === 'text'
          ? { order: it.order, type: 'text' as const, text: it.text, textType: it.textType }
          : {
              order: it.order,
              type: 'module_ref' as const,
              steps: it.steps.map((st) => ({
                stepOrder: st.stepOrder,
                textBefore: st.textBefore,
                textAfter: st.textAfter,
                callNameAlternate: st.callNameAlternate,
                warning: st.warning,
                helperText: st.helperText,
              })),
            },
      ),
    };

    const res = await saveImport(payload);
    if (!res.ok) return { ok: false, message: res.error };

    const { moduleId, isValid, chainBreaks, reusedExisting, flowWarnings, presentationId } = res.data;
    dispatch({ type: 'SET_META', patch: { presentationId, moduleId, isValid } });

    const parts = [`Draft saved — module #${moduleId}${reusedExisting ? ' (reused existing)' : ''}.`];
    if (isValid) {
      parts.push('Chain valid. Click Activate when ready.');
    } else {
      parts.push(
        unresolvedCount > 0
          ? `${unresolvedCount} unresolved step${unresolvedCount === 1 ? '' : 's'}.`
          : `${chainBreaks.length} chain break${chainBreaks.length === 1 ? '' : 's'}.`,
      );
    }
    if (flowWarnings.length) parts.push(`${flowWarnings.length} flow warning${flowWarnings.length === 1 ? '' : 's'}.`);
    return { ok: true, message: parts.join(' ') };
  };

  const handleActivate = async (): Promise<SaveOutcome> => {
    if (draft.presentationId == null) return { ok: false, message: 'Save draft first.' };
    const res = await activatePresentation(draft.presentationId);
    if (!res.ok) return { ok: false, message: res.error };
    return { ok: true, message: 'Activated — sequence is now searchable.' };
  };

  return (
    <div className="space-y-6">
      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Details</h2>
        <MetaForm draft={draft} formations={formations} onMeta={(patch) => dispatch({ type: 'SET_META', patch })} />
      </section>

      {!linked && (
        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Source</h2>
          <PasteDropzone initialText={draft.sourceText} hasDraft={hasDraft} onParse={handleParse} />
        </section>
      )}

      {hasDraft && (
        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Step review</h2>
          {linked && (
            <p className="rounded border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600">
              Linked to choreography — calls are locked. Edit cueing text and details only; to change the
              choreography, save a copy.
            </p>
          )}
          <UnresolvedBanner count={unresolvedCount} />
          <StepList
            items={draft.presentationItems}
            stepsByOrder={stepsByOrder}
            callOptions={callOptions}
            allFormations={allFormations}
            handlers={handlers}
            locked={linked}
          />
          {!linked && (
            <FooterBar
              hasDraft={hasDraft}
              unresolvedCount={unresolvedCount}
              moduleId={draft.moduleId}
              isValid={draft.isValid}
              onSaveDraft={handleSaveDraft}
              onActivate={handleActivate}
            />
          )}
        </section>
      )}
    </div>
  );
}
