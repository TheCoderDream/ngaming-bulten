import { formatOdd } from "@/shared/utils/formatTL";

import { useCouponActions } from "../../context/CouponContext";

import styles from "./CouponItem.module.scss";

import type { Selection } from "../../types";


type CouponItemProps = {
  index: number;
  item: Selection;
};

export function CouponItem({ index, item }: CouponItemProps) {
  const { remove } = useCouponActions();

  return (
    <li className={styles["coupon-item"]}>
      <span className={styles["coupon-item__index"]}>{index + 1}</span>
      <div className={styles["coupon-item__body"]}>
        <span className={styles["coupon-item__line"]}>
          Kod: {item.eventCode} Maç: {item.matchName} Oran: {formatOdd(item.odd)}
        </span>
      </div>
      <button
        type="button"
        className={styles["coupon-item__remove"]}
        onClick={() => remove(item.eventCode)}
        aria-label={`${item.matchName} seçimini kaldır`}
      >
        ×
      </button>
    </li>
  );
}
