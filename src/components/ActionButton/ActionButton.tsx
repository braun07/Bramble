import type { ButtonHTMLAttributes } from "react";
import { cn } from "../../utils/cn";
import styles from "./ActionButton.module.scss";

export type ActionButtonSize = "sm" | "md" | "lg";

export interface ActionButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ActionButtonSize;
  icon: string;
  iconAlt: string;
}

export function ActionButton({
  size = "md",
  className,
  icon,
  iconAlt,
  "aria-label": ariaLabel,
  type = "button",
  ...props
}: ActionButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        styles.actionButton,
        styles[size],
        "default-shadow items-center justify-center cursor-pointer inline-flex bg-white",
        className,
      )}
      aria-label={ariaLabel ?? iconAlt}
      {...props}
    >
      <img className={styles.icon} src={icon} alt="" />
    </button>
  );
}