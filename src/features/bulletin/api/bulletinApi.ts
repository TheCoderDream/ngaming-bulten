import { normalizeEvents } from "../lib/normalize";

import type { BulletinEvent, RawEvent } from "../types";

const DATA_URL = "/nesine-data.json";

export async function fetchBulletinEvents(): Promise<BulletinEvent[]> {
  const response = await fetch(DATA_URL);

  if (!response.ok) {
    throw new Error(`Bülten yüklenemedi (${response.status})`);
  }

  await new Promise((resolve) => setTimeout(resolve, 1000));

  const raw = (await response.json()) as RawEvent[];
  return normalizeEvents(raw);
}
