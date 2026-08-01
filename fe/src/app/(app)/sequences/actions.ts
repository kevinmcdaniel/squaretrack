'use server';

import { revalidatePath } from 'next/cache';
import { mutateData } from '@/lib/hac/mutate';

// Delete a draft presentation from the sequences list (import errors / mis-read text).
// DELETE cascades its items + steps; revalidate so the list drops the row.
export async function deleteDraft(id: number): Promise<{ ok: boolean; error?: string }> {
  const res = await mutateData(`presentation/${id}`, 'DELETE');
  if (!res.ok) return { ok: false, error: res.body.message || 'Could not delete the draft.' };
  revalidatePath('/sequences');
  return { ok: true };
}
