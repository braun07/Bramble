import type { FC } from "react";
import styles from "./Alert.module.scss";
import { cn } from "../../utils/cn";

export type AlertVariant = "info" | "success" | "warning" | "danger";

export interface AlertProps {
    variant?: AlertVariant;
    message?: string;
    icon?: string;
    dismissible?: boolean;
    onDismiss?: () => void;
    className?: string;
}

export const Alert: FC<AlertProps> = ({
    variant = "info",
    message,
    icon,
    dismissible = false,
    onDismiss,
    className = "",
}) => {
    return (
        <div className={`${styles.alert} ${styles[variant]} ${className} flex gap-10 rounded-4 px-15 py-10 text-10 items-center default-shadow`} role="alert" >
            {icon && <img src={icon} className={cn("flex items-center justify-center", styles.icon)} />}

            <div className={styles.content}>
                {message && <strong className="block line-h-140">{message}</strong>}
            </div>

            {dismissible && (
                <button
                    type="button"
                    className={cn("flex items-center justify-center text-20 line-h-100 cursor-pointer", styles.close)}
                    onClick={onDismiss}
                    aria-label="Dismiss alert"
                >
                    ×
                </button>
            )}
        </div>
    );
};