import { ALL_COLUMNS, GRID_TEMPLATE } from "../../lib/columns";

import styles from "./BulletinHeader.module.scss";

export function BulletinHeader() {
  return (
    <div className={styles["bulletin-header"]} style={{ gridTemplateColumns: GRID_TEMPLATE }}>
      {ALL_COLUMNS.map((col) => (
        <div key={col.id} className={styles["bulletin-header__cell"]} role="columnheader">
          {col.header}
        </div>
      ))}
    </div>
  );
}
