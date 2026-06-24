'use client';

import { useState } from 'react';
import { CallPicker } from './CallPicker';
import { FormationPicker } from './FormationPicker';
import { TypeBadge } from './TypeBadge';
import { WarningChip } from './WarningChip';
import type { CallOption, FormationOption } from './actions';
import type { DraftModuleRefStep, DraftModuleStep, TextType } from './types';
import { resolvedCallName } from './types';

// A choreo step needs attention until both its call and its start formation are
// pinned — the choreo_module_step the save will write requires (callId, startId).
export function stepNeedsAttention(step: DraftModuleStep): boolean {
  return step.resolution !== 'resolved' || step.callId == null || step.startId == null;
}

export type StepRowHandlers = {
  onResolveCall: (localId: string, call: CallOption, applyToSiblings: boolean) => void;
  onCatalogAddCall: (call: CallOption) => void;
  onPickFormation: (localId: string, opt: FormationOption) => void;
};

export function TextRow({ textType, text }: { textType: TextType; text: string }) {
  return (
    <div className="flex items-center gap-2 rounded border border-gray-200 bg-gray-50/60 px-3 py-1.5 text-sm">
      <TypeBadge kind={textType} />
      <span className="italic text-gray-600">{text || <span className="text-gray-400">(empty)</span>}</span>
    </div>
  );
}

export function CallStepRow({
  step,
  deco,
  callOptions,
  allFormations,
  handlers,
}: {
  step: DraftModuleStep;
  deco: DraftModuleRefStep;
  callOptions: CallOption[];
  allFormations: FormationOption[];
  handlers: StepRowHandlers;
}) {
  const callResolved = step.callId != null;
  const [editingCall, setEditingCall] = useState(false);
  const showPicker = !callResolved || editingCall;

  const needsAttention = stepNeedsAttention(step);
  const callName = resolvedCallName(step);

  const border = !needsAttention
    ? 'border-gray-200'
    : step.resolution === 'unresolved'
      ? 'border-red-400 bg-red-50/60'
      : 'border-amber-400 bg-amber-50/50';

  return (
    <div
      data-unresolved={needsAttention ? 'true' : undefined}
      className={`flex flex-wrap items-center gap-2 rounded border px-3 py-1.5 text-sm ${border}`}
    >
      <TypeBadge kind="call" />
      {step.designator && (
        <span className="rounded bg-indigo-100 px-1.5 py-0.5 text-xs font-medium text-indigo-800">{step.designator}</span>
      )}
      {deco.textBefore && <span className="text-gray-400">{deco.textBefore}</span>}

      {showPicker ? (
        <CallPicker
          callText={step.callText}
          options={callOptions}
          onResolve={(call) => {
            // A direct pick from the list resolves only this row; mass-resolve is
            // reserved for catalog mutations (handled below) where the text→call
            // mapping is now durable.
            handlers.onResolveCall(step.localId, call, false);
            setEditingCall(false);
          }}
          onCatalogAdd={(call) => {
            handlers.onCatalogAddCall(call);
            // A brand-new call (or a fresh synonym) maps this step's text, so apply
            // it to every other row that failed on the same text.
            handlers.onResolveCall(step.localId, call, true);
            setEditingCall(false);
          }}
        />
      ) : (
        <>
          <span className="font-medium text-gray-900">{callName ?? step.callText}</span>
          <button
            type="button"
            onClick={() => setEditingCall(true)}
            className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] font-medium text-gray-500 hover:bg-gray-200"
          >
            change
          </button>
          <FormationPicker
            callId={step.callId!}
            options={step.formationMatches}
            selectedId={step.startId}
            allFormations={allFormations}
            onPick={(opt) => handlers.onPickFormation(step.localId, opt)}
          />
        </>
      )}

      {step.count != null && (
        <span className="rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-700">×{step.count}</span>
      )}
      {step.warning && <WarningChip level="inherent" text={step.warning} />}
      {deco.warning && <WarningChip level="contextual" text={deco.warning} />}
      {deco.helperText && (
        <span
          className="rounded bg-yellow-50 px-1.5 py-0.5 text-xs italic text-yellow-700"
          title="Caller-private; never shown to dancers"
        >
          🔒 {deco.helperText}
        </span>
      )}
    </div>
  );
}
