import { Bulletin } from "@/features/bulletin/components/Bulletin/Bulletin";
import { useBulletin } from "@/features/bulletin/hooks/useBulletin";
import { CouponPanel } from "@/features/coupon/components/CouponPanel/CouponPanel";

import styles from "./App.module.scss";

export function App() {
  const { status, events, error, reload } = useBulletin();

  return (
    <div className={styles.app}>
      <main className={styles.app__main}>
        <Bulletin
          events={events}
          isLoading={status === "loading" || status === "idle"}
          error={error}
          onRetry={reload}
        />
      </main>
      <CouponPanel />
    </div>
  );
}
