import { formatTL } from "@/shared/utils/formatTL";

import styles from "./CouponFooter.module.scss";

type CouponFooterProps = {
  totalAmount: number;
};

export function CouponFooter({ totalAmount }: CouponFooterProps) {
  return (
    <footer className={styles["coupon-footer"]}>
      <span className={styles["coupon-footer__label"]}>Toplam Tutar:</span>
      <span className={styles["coupon-footer__amount"]}>{formatTL(totalAmount)}</span>
    </footer>
  );
}
