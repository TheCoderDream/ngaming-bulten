import { useCouponSummary } from "../../context/CouponContext";
import { CouponFooter } from "../CouponFooter/CouponFooter";
import { CouponItem } from "../CouponItem/CouponItem";

import styles from "./CouponPanel.module.scss";

export function CouponPanel() {
  const { items, totalAmount } = useCouponSummary();

  return (
    <aside className={styles["coupon-panel"]} aria-label="Kupon">
      <header className={styles["coupon-panel__header"]}>
        <h2 className={styles["coupon-panel__title"]}>Sepet</h2>
        <span className={styles["coupon-panel__badge"]}>{items.length}</span>
      </header>

      {items.length === 0 ? (
        <p className={styles["coupon-panel__empty"]}>Oran seçmek için tablodan tıklayın.</p>
      ) : (
        <ul className={styles["coupon-panel__list"]}>
          {items.map((item, index) => (
            <CouponItem key={item.eventCode} index={index} item={item} />
          ))}
        </ul>
      )}

      <CouponFooter totalAmount={totalAmount} />
    </aside>
  );
}
