import { useMemo, useReducer } from "react";

import { createStrictContext } from "@/shared/utils/createStrictContext";

import {
  INITIAL_COUPON_STATE,
  couponReducer,
  type CouponState,
} from "./couponReducer";
import {
  selectIsCellSelected,
  selectItems,
  selectTotalAmount,
  selectTotalOdds,
} from "./couponSelectors";

import type { Selection } from "../types";
import type { ReactNode } from "react";

type CouponActions = {
  toggle: (selection: Selection) => void;
  remove: (eventCode: string) => void;
  clear: () => void;
};

const CouponStateCtx = createStrictContext<CouponState>("CouponState");
const CouponActionsCtx = createStrictContext<CouponActions>("CouponActions");

export function CouponProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(couponReducer, INITIAL_COUPON_STATE);

  const actions = useMemo<CouponActions>(
    () => ({
      toggle: (selection) => dispatch({ type: "toggle", selection }),
      remove: (eventCode) => dispatch({ type: "remove", eventCode }),
      clear: () => dispatch({ type: "clear" }),
    }),
    [],
  );

  return (
    <CouponActionsCtx.Provider value={actions}>
      <CouponStateCtx.Provider value={state}>{children}</CouponStateCtx.Provider>
    </CouponActionsCtx.Provider>
  );
}

export function useCouponActions(): CouponActions {
  return CouponActionsCtx.use();
}

export function useCouponSelection(eventCode: string, outcomeId: string): boolean {
  const { selections } = CouponStateCtx.use();
  return useMemo(
    () => selectIsCellSelected(selections, eventCode, outcomeId),
    [selections, eventCode, outcomeId],
  );
}

export function useCouponSummary() {
  const { selections } = CouponStateCtx.use();

  const items = useMemo(() => selectItems(selections), [selections]);
  const totalOdds = useMemo(() => selectTotalOdds(items), [items]);
  const totalAmount = useMemo(() => selectTotalAmount(totalOdds), [totalOdds]);

  return { items, totalOdds, totalAmount, count: items.length };
}
