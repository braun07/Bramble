import { useEffect, useState, type HTMLAttributes } from "react";
import { cn } from "../../utils/cn";
import styles from "./Alert.module.scss";

export type AlertVariant = "info" | "success" | "warning" | "danger";

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  message?: string;
  icon?: string;
  dismissible?: boolean;
  DebugMode?: boolean;
}

export function Alert({
  variant = "info",
  message = "this is an alert",
  icon,
  dismissible = true,
  DebugMode = false,
  className,
  ...props
}: AlertProps) {

  const [alertVisible, setAlertVisible] = useState(true);

  const handleDismissAlert = () => setAlertVisible(false);

  useEffect(() => {
    if (alertVisible || !DebugMode) return;

    const timer = setTimeout(() => setAlertVisible(true), 3000);
    return () => clearTimeout(timer);
  }, [alertVisible, DebugMode]);

  return (
    <>
      {alertVisible && (
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
              alt="alert icon"
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
              onClick={handleDismissAlert}
              aria-label="Dismiss alert"
            >
              ×
            </button>
          )}
        </div>
      )}
    </>
  );
}