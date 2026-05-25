import { Skeleton } from "@/shared/components/Skeleton/Skeleton";

import { ALL_COLUMNS, GRID_TEMPLATE } from "../../lib/columns";

import styles from "./BulletinSkeleton.module.scss";

const SKELETON_ROW_COUNT = 30;

export function BulletinSkeleton() {
  return (
    <div className={styles["bulletin-skeleton"]} aria-busy="true" aria-label="Bülten yükleniyor">
      {Array.from({ length: SKELETON_ROW_COUNT }, (_, rowIndex) => (
        <div
          key={rowIndex}
          className={styles["bulletin-skeleton__row"]}
          style={{ gridTemplateColumns: GRID_TEMPLATE }}
        >
          {ALL_COLUMNS.map((col) => (
            <div key={col.id} className={styles["bulletin-skeleton__cell"]}>
              <Skeleton
                width={col.kind === "meta" ? "70%" : "60%"}
                height={col.kind === "meta" ? "1rem" : "0.75rem"}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
