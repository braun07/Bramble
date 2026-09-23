import type { HTMLAttributes } from "react";
import { cn } from "../../utils/cn";
import styles from "./Alert.module.scss";

export type AlertVariant = "info" | "success" | "warning" | "danger";

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  message?: string;
  icon?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
}

export function Alert({
  variant = "info",
  message,
  icon,
  dismissible = false,
  onDismiss,
  className,
  ...props
}: AlertProps) {
  return (
    <div
      role="alert"
      className={cn(
        styles.alert,
        styles[variant],
        "flex gap-10 rounded-4 px-15 py-10 text-10 items-center default-shadow",
        className,
      )}
      {...props}
    >
      {icon && (
        <img
          src={icon}
          alt=""
          className={cn("flex items-center justify-center", styles.icon)}
        />
      )}

      <div className={styles.content}>
        {message && <strong className="block line-h-140">{message}</strong>}
      </div>

      {dismissible && (
        <button
          type="button"
          className={cn(
            "flex items-center justify-center text-20 line-h-100 cursor-pointer",
            styles.close,
          )}
          onClick={onDismiss}
          aria-label="Dismiss alert"
        >
          ×
        </button>
      )}
    </div>
  );
}