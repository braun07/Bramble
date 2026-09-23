import type { CSSProperties } from "react";
import { cn } from "../../utils/cn";
import styles from "./Loading.module.scss";

export interface LoadingProps {
  size?: number;
  borderWidth?: number;
  colorMain?: string;
  colorBackground?: string;
  ratio?: number;
  className?: string;
}

export function Loading({
  size = 45,
  borderWidth = 8,
  colorMain = "#d6284e",
  colorBackground = "#ffffff",
  ratio = 0.25,
  className,
}: LoadingProps) {
  const radius = (size - borderWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const primaryLength = circumference * ratio;

  return (
    <svg
      className={cn(styles.loadingSpinner, className)}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ "--spinner-duration": "1.1s" } as CSSProperties}
      aria-hidden="true"
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={colorBackground}
        strokeWidth={borderWidth}
        strokeLinecap="round"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={colorMain}
        strokeWidth={borderWidth}
        strokeLinecap="round"
        strokeDasharray={`${primaryLength} ${circumference}`}
      />
    </svg>
  );
}