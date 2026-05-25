import { cellKey } from "./columns";

import type { BulletinEvent, Outcome, RawEvent } from "../types";

function parseOutcome(groupId: string, raw: RawEvent["OCG"][string]["OC"][string]): Outcome {
  return {
    groupId,
    outcomeId: raw.ID,
    label: raw.N,
    odd: parseFloat(raw.O),
    mbs: parseInt(raw.MBS, 10),
  };
}

function buildCells(raw: RawEvent): Map<string, Outcome> {
  const cells = new Map<string, Outcome>();

  for (const [groupId, group] of Object.entries(raw.OCG ?? {})) {
    for (const outcome of Object.values(group.OC ?? {})) {
      cells.set(cellKey(groupId, outcome.N), parseOutcome(groupId, outcome));
    }
  }

  return cells;
}

function resolveMbs(raw: RawEvent): number {
  const firstGroup = Object.values(raw.OCG ?? {})[0];
  if (!firstGroup) return 0;
  return parseInt(firstGroup.MBS, 10);
}

export function normalizeEvents(rawEvents: RawEvent[]): BulletinEvent[] {
  return rawEvents.map((raw) => ({
    code: raw.C,
    name: raw.N,
    date: raw.D,
    time: raw.T,
    day: raw.DAY,
    league: raw.LN,
    mbs: resolveMbs(raw),
    cells: buildCells(raw),
  }));
}
