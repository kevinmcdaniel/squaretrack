'use client';

import { CallStepRow, TextRow, type StepRowHandlers } from './StepRow';
import type { CallOption, FormationOption } from './actions';
import type { DraftModuleStep, DraftPresentationItem } from './types';

// Renders the two interleaved layers in source order: each presentation item is a
// row (text) or a group of choreo-step rows (module_ref). A module_ref step pairs a
// choreo step (call + formation, looked up by order) with its presentation
// decoration (spoken text, contextual warning, caller-private helper).
export function StepList({
  items,
  stepsByOrder,
  callOptions,
  allFormations,
  handlers,
  locked = false,
}: {
  items: DraftPresentationItem[];
  stepsByOrder: Map<number, DraftModuleStep>;
  callOptions: CallOption[];
  allFormations: FormationOption[];
  handlers: StepRowHandlers;
  locked?: boolean;
}) {
  if (items.length === 0) {
    return <p className="text-sm text-gray-500">Parse some text to see the step review.</p>;
  }

  return (
    <ol className="space-y-1.5">
      {items.map((item) =>
        item.type === 'text' ? (
          <li key={item.localId}>
            <TextRow textType={item.textType} text={item.text} />
          </li>
        ) : (
          <li key={item.localId} className="space-y-1.5">
            {item.steps.map((deco) => {
              const step = stepsByOrder.get(deco.stepOrder);
              if (!step) return null;
              return (
                <CallStepRow
                  key={deco.stepOrder}
                  step={step}
                  deco={deco}
                  callOptions={callOptions}
                  allFormations={allFormations}
                  handlers={handlers}
                  locked={locked}
                />
              );
            })}
          </li>
        ),
      )}
    </ol>
  );
}
