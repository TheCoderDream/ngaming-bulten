import clsx from "clsx";

import styles from "./Skeleton.module.scss";

type SkeletonProps = {
  className?: string;
  width?: string | number;
  height?: string | number;
};

export function Skeleton({ className, width = "100%", height = "1rem" }: SkeletonProps) {
  return (
    <span
      className={clsx(styles.skeleton, styles["skeleton--shimmer"], className)}
      style={{ width, height }}
      aria-hidden="true"
    />
  );
}
