import { STAKE_TL } from "../types";

import type { Selection } from "../types";

export function selectItems(selections: Map<string, Selection>): Selection[] {
  return Array.from(selections.values());
}

export function selectTotalOdds(items: readonly Selection[]): number {
  if (items.length === 0) return 0;
  return items.reduce((acc, item) => acc * item.odd, 1);
}

export function selectTotalAmount(totalOdds: number): number {
  return totalOdds * STAKE_TL;
}

export function selectIsCellSelected(
  selections: Map<string, Selection>,
  eventCode: string,
  outcomeId: string,
): boolean {
  return selections.get(eventCode)?.outcomeId === outcomeId;
}
