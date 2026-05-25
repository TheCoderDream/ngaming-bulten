import { memo, useCallback } from "react";

import { useCouponActions, useCouponSelection } from "@/features/coupon";
import { bem } from "@/shared/utils/bem";
import { formatOdd } from "@/shared/utils/formatTL";

import styles from "./OddCell.module.scss";

import type { Outcome } from "@/features/bulletin/types";


type OddCellProps = {
  eventCode: string;
  matchName: string;
  outcome: Outcome;
};

export const OddCell = memo(function OddCell({ eventCode, matchName, outcome }: OddCellProps) {
  const cx = bem(styles, "odd-cell");
  const isSelected = useCouponSelection(eventCode, outcome.outcomeId);
  const { toggle } = useCouponActions();

  const handleClick = useCallback(() => {
    toggle({
      eventCode,
      groupId: outcome.groupId,
      outcomeId: outcome.outcomeId,
      label: outcome.label,
      odd: outcome.odd,
      matchName,
      mbs: outcome.mbs,
    });
  }, [toggle, eventCode, matchName, outcome]);

  return (
    <button
      type="button"
      className={cx(undefined, { selected: isSelected })}
      onClick={handleClick}
      aria-pressed={isSelected}
      aria-label={`${matchName} ${outcome.label} oran ${formatOdd(outcome.odd)}`}
    >
      {formatOdd(outcome.odd)}
    </button>
  );
});
