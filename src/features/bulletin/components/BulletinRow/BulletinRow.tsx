import { memo } from "react";

import { OddCell } from "@/shared/components/OddCell/OddCell";

import { ODD_COLUMNS, GRID_TEMPLATE, cellKey } from "../../lib/columns";

import styles from "./BulletinRow.module.scss";

import type { BulletinEvent } from "../../types";


type BulletinRowProps = {
  event: BulletinEvent;
  top: number;
  height: number;
};

export const BulletinRow = memo(function BulletinRow({ event, top, height }: BulletinRowProps) {
  return (
    <div
      className={styles["bulletin-row"]}
      style={{ transform: `translateY(${top}px)`, height, gridTemplateColumns: GRID_TEMPLATE }}
      role="row"
    >
      <div className={styles["bulletin-row__meta"]}>
        <span className={styles["bulletin-row__league"]}>
          {event.date} {event.day} {event.league}
        </span>
        <span className={styles["bulletin-row__match"]}>
          <span className={styles["bulletin-row__code"]}>{event.code}</span>
          <span className={styles["bulletin-row__time"]}>{event.time}</span>
          <span className={styles["bulletin-row__name"]}>{event.name}</span>
        </span>
      </div>

      <div className={styles["bulletin-row__placeholder"]} aria-hidden="true">
        —
      </div>

      <div className={styles["bulletin-row__mbs"]}>{event.mbs}</div>

      {ODD_COLUMNS.map((col) => {
        if (col.kind !== "odd" || !col.groupId || !col.label) {
          return (
            <div key={col.id} className={styles["bulletin-row__empty"]} aria-hidden="true" />
          );
        }

        const outcome = event.cells.get(cellKey(col.groupId, col.label));

        if (!outcome) {
          return (
            <div key={col.id} className={styles["bulletin-row__empty"]} aria-hidden="true" />
          );
        }

        return (
          <OddCell
            key={col.id}
            eventCode={event.code}
            matchName={event.name}
            outcome={outcome}
          />
        );
      })}
    </div>
  );
});
