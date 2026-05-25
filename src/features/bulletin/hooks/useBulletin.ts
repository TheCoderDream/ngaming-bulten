import { useCallback, useEffect, useState } from "react";

import { fetchBulletinEvents } from "../api/bulletinApi";

import type { BulletinEvent, BulletinState, BulletinStatus } from "../types";

export function useBulletin(): BulletinState & { reload: () => void } {
  const [status, setStatus] = useState<BulletinStatus>("idle");
  const [events, setEvents] = useState<BulletinEvent[]>([]);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setStatus("loading");
    setError(null);

    try {
      const data = await fetchBulletinEvents();
      setEvents(data);
      setStatus("success");
    } catch (err) {
      setEvents([]);
      setStatus("error");
      setError(err instanceof Error ? err.message : "Bilinmeyen hata");
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return { status, events, error, reload: load };
}
