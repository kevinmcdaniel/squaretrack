'use server';

// Server Actions are the bridge between the client-side import editor and the
// backend: reads go through fetchData, writes through mutateData (both server-only,
// they read BE_URL which is not exposed to the browser).

import { fetchData } from '@/lib/hac/fetch';
import { mutateData } from '@/lib/hac/mutate';
import type { ParsedDraft } from './types';

export type ActionResult<T> = { ok: true; data: T } | { ok: false; error: string };

export type CallOption = { callId: number; name: string };
export type FormationOption = { startId: number; name: string };

// Step 1 (persist raw) + step 2 (parse) of the import flow, in one round trip.
// The raw presentation document is saved first so a paste is captured even if the
// caller abandons the review; the parse is stateless and drives the step review.
export async function pasteAndParse(input: {
  name: string;
  sourceText: string;
}): Promise<ActionResult<{ presentationId: number; draft: ParsedDraft }>> {
  const sourceText = input.sourceText.trim();
  if (!sourceText) return { ok: false, error: 'Paste some calling text first.' };

  // Controller requires a name; fall back to a timestamped placeholder the caller
  // can rename before the final save (PUT) wires the presentation back.
  const name = input.name.trim() || `Untitled import ${new Date().toISOString().slice(0, 16)}`;

  const saved = await mutateData<{ id: number }>('presentation', 'POST', { name, sourceText, items: [] });
  if (!saved.ok || saved.body.data?.id == null) {
    return { ok: false, error: saved.body.message || 'Could not save the raw presentation.' };
  }

  const parsed = await mutateData<ParsedDraft>('sequence/parse', 'POST', { text: sourceText });
  if (!parsed.ok || !parsed.body.data) {
    return { ok: false, error: parsed.body.message || 'Could not parse the text.' };
  }

  return { ok: true, data: { presentationId: saved.body.data.id, draft: parsed.body.data } };
}

// All calls, for the CallPicker autocomplete. The list endpoint has no server-side
// search, so the picker filters this client-side (the catalog is small).
export async function listCalls(): Promise<ActionResult<CallOption[]>> {
  const res = await fetchData<Array<{ callId: number; name: string }>>('call/list');
  if (res.status >= 400) return { ok: false, error: res.message };
  return { ok: true, data: (res.data ?? []).map((c) => ({ callId: c.callId, name: c.name })) };
}

// Valid start formations (FASRs) for a call. The endpoint returns formation
// records; a step's startId is the formation's formId.
export async function formationsForCall(callId: number): Promise<ActionResult<FormationOption[]>> {
  const res = await fetchData<Array<{ formId: number; name: string }>>(`formation?callId=${callId}`);
  if (res.status >= 400) return { ok: false, error: res.message };
  return { ok: true, data: (res.data ?? []).map((f) => ({ startId: f.formId, name: f.name })) };
}

// Every formation, for the "link a starting formation" quick-add flow.
export async function listFormations(): Promise<ActionResult<FormationOption[]>> {
  const res = await fetchData<Array<{ formId: number; name: string }>>('formation', { shape: 'list' });
  if (res.status >= 400) return { ok: false, error: res.message };
  return { ok: true, data: (res.data ?? []).map((f) => ({ startId: f.formId, name: f.name })) };
}

// ---- Save (module + presentation wire-back) -------------------------------

export type SaveModuleStep = {
  order: number;
  callId: number;
  startId: number;
  designator: string | null;
  count: number | null;
  warning: string | null;
};

type SaveItemStep = {
  stepOrder: number;
  textBefore: string | null;
  textAfter: string | null;
  callNameAlternate: string | null;
  warning: string | null;
  helperText: string | null;
};

export type SaveItem =
  | { order: number; type: 'text'; text: string; textType: string }
  | { order: number; type: 'module_ref'; steps: SaveItemStep[] };

export type SaveImportInput = {
  presentationId: number | null;
  name: string;
  source: string | null;
  activator: string | null;
  rating: string | null;
  notes: string | null;
  sourceText: string;
  startFormationId: number;
  teachOrderId: number | null;
  moduleSteps: SaveModuleStep[];
  items: SaveItem[];
};

export type SaveImportResult = {
  moduleId: number;
  isValid: boolean;
  chainBreaks: number[];
  reusedExisting: boolean;
  flowWarnings: unknown[];
  presentationId: number;
};

// Persist the choreo module, then wire the (already-saved) presentation back to it.
// The module save runs #21 variant detection: an identical step list reuses the
// existing module instead of minting a duplicate (reusedExisting). The presentation
// gets module_ref items stamped with the saved moduleId, interleaved with the text
// items in source order.
export async function saveImport(input: SaveImportInput): Promise<ActionResult<SaveImportResult>> {
  if (input.moduleSteps.length === 0) return { ok: false, error: 'Nothing to save — parse some calls first.' };
  const name = input.name.trim() || `Imported sequence ${new Date().toISOString().slice(0, 16)}`;

  const moduleRes = await mutateData<{ id: number; isValid: boolean }>('module', 'POST', {
    name,
    startFormId: input.startFormationId,
    teachOrderId: input.teachOrderId,
    isVerified: false,
    steps: input.moduleSteps,
  });
  if (!moduleRes.ok || moduleRes.body.data?.id == null) {
    return { ok: false, error: moduleRes.body.message || 'Could not save the choreo module.' };
  }
  const moduleId = moduleRes.body.data.id;

  const items = input.items.map((it) =>
    it.type === 'text'
      ? { order: it.order, type: 'text', text: it.text, textType: it.textType }
      : { order: it.order, type: 'module_ref', moduleId, steps: it.steps },
  );
  const body = {
    name,
    source: input.source,
    activator: input.activator,
    rating: input.rating,
    notes: input.notes,
    sourceText: input.sourceText,
    items,
  };

  const presRes =
    input.presentationId != null
      ? await mutateData<{ id: number }>(`presentation/${input.presentationId}`, 'PUT', body)
      : await mutateData<{ id: number }>('presentation', 'POST', body);
  if (!presRes.ok) {
    return { ok: false, error: presRes.body.message || 'Saved the module, but could not wire the presentation.' };
  }

  return {
    ok: true,
    data: {
      moduleId,
      isValid: moduleRes.body.data.isValid ?? false,
      chainBreaks: (moduleRes.body.chainBreaks as number[]) ?? [],
      reusedExisting: (moduleRes.body.reusedExisting as boolean) ?? false,
      flowWarnings: (presRes.body.flowWarnings as unknown[]) ?? [],
      presentationId: input.presentationId ?? presRes.body.data?.id ?? 0,
    },
  };
}

// ---- Quick-add (inline resolution) ----------------------------------------

export async function addCall(name: string): Promise<ActionResult<CallOption>> {
  const trimmed = name.trim();
  if (!trimmed) return { ok: false, error: 'Call name is required.' };
  const res = await mutateData<{ callId: number; name: string }>('call', 'POST', { name: trimmed });
  if (!res.ok || !res.body.data) return { ok: false, error: res.body.message || 'Could not add the call.' };
  return { ok: true, data: { callId: res.body.data.callId, name: res.body.data.name } };
}

export async function addSynonym(callId: number, alias: string): Promise<ActionResult<{ alias: string }>> {
  const trimmed = alias.trim();
  if (!trimmed) return { ok: false, error: 'Alias is required.' };
  const res = await mutateData<{ alias: string }>(`call/${callId}/synonym`, 'POST', { alias: trimmed });
  if (!res.ok) return { ok: false, error: res.body.message || 'Could not add the synonym.' };
  return { ok: true, data: { alias: trimmed } };
}

export async function addFormation(name: string): Promise<ActionResult<FormationOption>> {
  const trimmed = name.trim();
  if (!trimmed) return { ok: false, error: 'Formation name is required.' };
  const res = await mutateData<{ formId: number; name: string }>('formation', 'POST', { name: trimmed });
  if (!res.ok || !res.body.data) return { ok: false, error: res.body.message || 'Could not add the formation.' };
  return { ok: true, data: { startId: res.body.data.formId, name: res.body.data.name } };
}

// Register a (call, startFormation) → endFormation tuple so a call resolves from a
// given FASR. endId defaults to startId when the caller does not yet know the
// resulting formation (a chain-break the module validator will flag on save).
export async function addCallFormation(input: {
  callId: number;
  startId: number;
  endId: number;
}): Promise<ActionResult<FormationOption>> {
  const res = await mutateData('call-formation', 'POST', input);
  if (!res.ok) return { ok: false, error: res.body.message || 'Could not link the formation to the call.' };
  // Echo the start formation so the picker can re-resolve the row.
  const fetched = await formationsForCall(input.callId);
  if (!fetched.ok) return { ok: false, error: fetched.error };
  const opt = fetched.data.find((f) => f.startId === input.startId);
  return opt ? { ok: true, data: opt } : { ok: false, error: 'Linked, but could not reload formations.' };
}
