import type { ButtonHTMLAttributes } from "react";
import { cn } from "../../utils/cn";
import styles from "./ActionButton.module.scss";

export type ButtonSize = "sm" | "md" | "lg";

export interface ActionButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  icon: string;
  iconAlt: string;
}

export function ActionButton({
  size = "md",
  className,
  onClick,
  icon,
  iconAlt,
  "aria-label": ariaLabel,
  ...props
}: ActionButtonProps) {
  const classes = cn(
    styles.actionButton,
    styles[`actionButton--${size}`],
    "default-shadow",
    className
  );

  return (
    <button
      type="button"
      className={classes}
      onClick={onClick}
      aria-label={ariaLabel ?? iconAlt}
      {...props}
    >
      <img className={styles.actionButton__icon} src={icon} alt="" />
    </button>
  );
}