import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";

import { BulletinHeader } from "../BulletinHeader/BulletinHeader";
import { BulletinRow } from "../BulletinRow/BulletinRow";
import { BulletinSkeleton } from "../BulletinSkeleton/BulletinSkeleton";

import styles from "./Bulletin.module.scss";

import type { BulletinEvent } from "../../types";


const ROW_HEIGHT = 40;

type BulletinProps = {
  events: BulletinEvent[];
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
};

export function Bulletin({ events, isLoading, error, onRetry }: BulletinProps) {
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: events.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: 8,
    getItemKey: (index) => events[index]?.code ?? index,
  });

  return (
    <section className={styles.bulletin} aria-label="Bülten">
      <header className={styles["bulletin__toolbar"]}>
        <h1 className={styles["bulletin__title"]}>Bülten</h1>
        <span className={styles["bulletin__count"]}>
          Event Count: {isLoading ? "…" : events.length}
        </span>
      </header>

      {error && (
        <div className={styles["bulletin__error"]} role="alert">
          <p>{error}</p>
          <button type="button" onClick={onRetry}>
            Tekrar dene
          </button>
        </div>
      )}

      <div
        ref={parentRef}
        className={styles["bulletin__scroller"]}
        role="table"
        aria-label="Maç bülteni"
        aria-rowcount={isLoading ? undefined : events.length + 1}
        aria-busy={isLoading}
      >
        <BulletinHeader />

        {isLoading ? (
          <BulletinSkeleton />
        ) : (
          <div
            className={styles["bulletin__body"]}
            style={{ height: rowVirtualizer.getTotalSize(), position: "relative" }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const event = events[virtualRow.index];
              if (!event) return null;

              return (
                <BulletinRow
                  key={event.code}
                  event={event}
                  top={virtualRow.start}
                  height={virtualRow.size}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
