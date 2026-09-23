import { forwardRef, useCallback, useEffect, useRef } from "react";
import type { ChangeEvent, InputHTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";
import styles from "./Checkbox.module.scss";

export type CheckboxSize = "sm" | "md" | "lg";

export interface CheckboxProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "type" | "size" | "onChange"
  > {
  onChange?: (checked: boolean, event: ChangeEvent<HTMLInputElement>) => void;
  size?: CheckboxSize;
  label?: ReactNode;
  indeterminate?: boolean;
  boxClassName?: string;
  labelClassName?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(
    {
      size = "md",
      label,
      indeterminate = false,
      onChange,
      disabled,
      className,
      boxClassName,
      labelClassName,
      ...props
    },
    ref,
  ) {
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
      if (inputRef.current) inputRef.current.indeterminate = indeterminate;
    }, [indeterminate]);

    const setRefs = useCallback(
      (node: HTMLInputElement | null) => {
        inputRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      },
      [ref],
    );

    return (
      <label
        className={cn(
          styles.checkbox,
          styles[size],
          disabled && styles.disabled,
          className,
        )}
      >
        <input
          {...props}
          ref={setRefs}
          type="checkbox"
          className={styles.input}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.checked, e)}
        />
        <span
          className={cn(styles.box, "default-shadow", boxClassName)}
          aria-hidden="true"
        >
          <svg className={styles.icon} viewBox="0 0 16 16" fill="none">
            <path
              className={styles.check}
              d="M3.5 8.5l3 3 6-7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              className={styles.dash}
              d="M4 8h8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </span>
        {label !== undefined && (
          <span className={cn(styles.label, labelClassName)}>{label}</span>
        )}
      </label>
    );
  },
);

Checkbox.displayName = "Checkbox";
