import { CouponProvider } from "@/features/coupon/context/CouponContext";

import type { ReactNode } from "react";

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return <CouponProvider>{children}</CouponProvider>;
}
