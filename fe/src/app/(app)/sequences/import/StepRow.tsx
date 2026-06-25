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
  onSplitStep: (localId: string, pieces: string[]) => void;
};

// Split-a-line editor: one call per line. Pre-fills with the step's text and, when
// that text has commas, offers a one-click comma split. Apply hands the non-empty
// lines back as the new steps.
function SplitBox({
  callText,
  onApply,
  onCancel,
}: {
  callText: string;
  onApply: (pieces: string[]) => void;
  onCancel: () => void;
}) {
  const [text, setText] = useState(callText);
  const pieces = text.split('\n').map((l) => l.trim()).filter(Boolean);
  return (
    <div className="mt-2 space-y-2 rounded border border-blue-200 bg-blue-50/50 p-2">
      <p className="text-xs text-gray-600">One call per line:</p>
      <textarea
        aria-label="Split into calls"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={Math.max(2, pieces.length)}
        className="w-full rounded border border-gray-300 px-2 py-1 font-mono text-xs focus:border-blue-500 focus:outline-none"
      />
      <div className="flex items-center gap-2">
        {callText.includes(',') && (
          <button
            type="button"
            onClick={() => setText(callText.split(',').map((s) => s.trim()).filter(Boolean).join('\n'))}
            className="rounded bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-600 hover:bg-gray-200"
          >
            At comma
          </button>
        )}
        <button
          type="button"
          disabled={pieces.length < 2}
          onClick={() => onApply(pieces)}
          className="rounded bg-blue-600 px-2 py-0.5 text-xs font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          Apply
        </button>
        <button type="button" onClick={onCancel} className="text-xs text-gray-500 hover:underline">
          Cancel
        </button>
      </div>
    </div>
  );
}

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
  locked = false,
}: {
  step: DraftModuleStep;
  deco: DraftModuleRefStep;
  callOptions: CallOption[];
  allFormations: FormationOption[];
  handlers: StepRowHandlers;
  locked?: boolean;
}) {
  const callResolved = step.callId != null;
  const [editingCall, setEditingCall] = useState(false);
  const [splitting, setSplitting] = useState(false);
  // Linked sequences lock the choreography: no resolver, no re-pick, no split (#20).
  const showPicker = !locked && (!callResolved || editingCall);

  const needsAttention = stepNeedsAttention(step);
  const callName = resolvedCallName(step);
  const formationName =
    step.startId != null ? allFormations.find((f) => f.startId === step.startId)?.name ?? null : null;

  const border = !needsAttention
    ? 'border-gray-200'
    : step.resolution === 'unresolved'
      ? 'border-red-400 bg-red-50/60'
      : 'border-amber-400 bg-amber-50/50';

  return (
    <div
      data-unresolved={needsAttention ? 'true' : undefined}
      className={`rounded border px-3 py-1.5 text-sm ${border}`}
    >
      <div className="flex flex-wrap items-center gap-2">
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
            {!locked && (
              <button
                type="button"
                onClick={() => setEditingCall(true)}
                className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] font-medium text-gray-500 hover:bg-gray-200"
              >
                change
              </button>
            )}
            {locked ? (
              formationName && (
                <span className="rounded bg-slate-50 px-1.5 py-0.5 text-xs text-slate-600">from {formationName}</span>
              )
            ) : (
              <FormationPicker
                callId={step.callId!}
                options={step.formationMatches}
                selectedId={step.startId}
                allFormations={allFormations}
                onPick={(opt) => handlers.onPickFormation(step.localId, opt)}
              />
            )}
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

        {!locked && (
          <button
            type="button"
            onClick={() => setSplitting((v) => !v)}
            className="ml-auto rounded bg-gray-100 px-1.5 py-0.5 text-[10px] font-medium text-gray-500 hover:bg-gray-200"
          >
            Split line
          </button>
        )}
      </div>

      {splitting && !locked && (
        <SplitBox
          callText={step.callText}
          onApply={(pieces) => {
            handlers.onSplitStep(step.localId, pieces);
            setSplitting(false);
          }}
          onCancel={() => setSplitting(false)}
        />
      )}
    </div>
  );
}
