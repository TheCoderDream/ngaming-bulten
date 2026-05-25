import type { Selection } from "../types";

export type CouponState = {
  selections: Map<string, Selection>;
};

export type CouponAction =
  | { type: "toggle"; selection: Selection }
  | { type: "remove"; eventCode: string }
  | { type: "clear" };

export const INITIAL_COUPON_STATE: CouponState = {
  selections: new Map(),
};

export function couponReducer(state: CouponState, action: CouponAction): CouponState {
  switch (action.type) {
    case "toggle": {
      const next = new Map(state.selections);
      const existing = next.get(action.selection.eventCode);

      if (existing?.outcomeId === action.selection.outcomeId) {
        next.delete(action.selection.eventCode);
      } else {
        next.set(action.selection.eventCode, action.selection);
      }

      return { selections: next };
    }
    case "remove": {
      const next = new Map(state.selections);
      next.delete(action.eventCode);
      return { selections: next };
    }
    case "clear":
      return INITIAL_COUPON_STATE;
  }
}
