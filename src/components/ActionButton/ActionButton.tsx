import type { ButtonHTMLAttributes } from "react";
import { cn } from "../../utils/cn";
import styles from "./ActionButton.module.scss";
import defaultIconUrl from "../../assets/default_icon.svg";

export type ActionButtonSize = "sm" | "md" | "lg";

export interface ActionButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ActionButtonSize;
  icon?: string;
  iconAlt?: string;
  disabled?: boolean;
}

export function ActionButton({
  size = "md",
  className,
  icon = defaultIconUrl,
  iconAlt = "Action Button Icon",
  "aria-label": ariaLabel,
  type = "button",
  disabled,
  ...props
}: ActionButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}

      className={cn(
        styles.actionButton,
        styles[size],
        "default-shadow items-center justify-center cursor-pointer inline-flex bg-white",
        className,
      )}
      aria-label={ariaLabel ?? iconAlt}
      {...props}
    >
      <img
        className={styles.icon}
        src={icon} alt={iconAlt}
        onError={(e) => {
          if (e.currentTarget.src !== defaultIconUrl) e.currentTarget.src = defaultIconUrl;
        }} />
    </button>
  );
}