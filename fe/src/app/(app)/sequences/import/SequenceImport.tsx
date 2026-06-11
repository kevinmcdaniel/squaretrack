'use client';

import { useEffect, useMemo, useReducer, useState } from 'react';
import {
  formationsForCall,
  listCalls,
  listFormations,
  pasteAndParse,
  saveImport,
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
import { emptyDraft, importReducer } from './reducer';

// Root of the import editor. Owns the two-layer draft (choreo steps + interleaved
// presentation items) in a reducer, orchestrates paste → save-raw → parse, and lets
// the caller resolve unmatched calls / formations inline before the save.
export function SequenceImport({
  formations,
  startFormationId,
}: {
  formations: FormationLite[];
  startFormationId: number;
}) {
  const [draft, dispatch] = useReducer(importReducer, emptyDraft(startFormationId));
  const [callOptions, setCallOptions] = useState<CallOption[]>([]);
  const [allFormations, setAllFormations] = useState<FormationOption[]>([]);

  // Load the catalogs once for the inline pickers.
  useEffect(() => {
    let live = true;
    void (async () => {
      const [calls, forms] = await Promise.all([listCalls(), listFormations()]);
      if (!live) return;
      if (calls.ok) setCallOptions(calls.data);
      if (forms.ok) setAllFormations(forms.data);
    })();
    return () => {
      live = false;
    };
  }, []);

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
    const result = await pasteAndParse({ name: draft.name, sourceText: text });
    if (!result.ok) return result.error;
    dispatch({ type: 'SET_DRAFT', parsed: result.data.draft });
    dispatch({ type: 'SET_META', patch: { presentationId: result.data.presentationId } });
    return null;
  };

  // After a call is chosen, pull its registered FASRs and auto-pin when there is
  // exactly one — otherwise the FormationPicker prompts for a choice.
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
  };

  const canSave = draft.moduleSteps.length > 0 && unresolvedCount === 0;

  const handleSave = async (): Promise<SaveOutcome> => {
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
        callId: s.callId as number,
        startId: s.startId as number,
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
    dispatch({ type: 'SET_META', patch: { presentationId } });
    const parts = [`Saved ✓ — choreo module #${moduleId}${reusedExisting ? ' (reused existing)' : ''}.`];
    parts.push(
      isValid ? 'Formation chain valid.' : `${chainBreaks.length} chain break${chainBreaks.length === 1 ? '' : 's'} (saved as draft).`,
    );
    if (flowWarnings.length) parts.push(`${flowWarnings.length} flow warning${flowWarnings.length === 1 ? '' : 's'}.`);
    return { ok: true, message: parts.join(' ') };
  };

  return (
    <div className="space-y-6">
      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Details</h2>
        <MetaForm draft={draft} formations={formations} onMeta={(patch) => dispatch({ type: 'SET_META', patch })} />
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Source</h2>
        <PasteDropzone initialText={draft.sourceText} hasDraft={hasDraft} onParse={handleParse} />
      </section>

      {hasDraft && (
        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Step review</h2>
          <UnresolvedBanner count={unresolvedCount} />
          <StepList
            items={draft.presentationItems}
            stepsByOrder={stepsByOrder}
            callOptions={callOptions}
            allFormations={allFormations}
            handlers={handlers}
          />
          <FooterBar canSave={canSave} blockedCount={unresolvedCount} onSave={handleSave} />
        </section>
      )}
    </div>
  );
}
