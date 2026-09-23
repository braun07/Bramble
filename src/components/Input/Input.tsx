import { forwardRef, useId } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";
import styles from "./Input.module.scss";

export type InputSize = "sm" | "md" | "lg";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  error?: string;
  helperText?: string;
  size?: InputSize;
  fullWidth?: boolean;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input(
    {
      id,
      label,
      error,
      helperText,
      size = "md",
      fullWidth = false,
      leftElement,
      rightElement,
      className,
      disabled,
      required,
      ...props
    },
    ref,
  ) {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    return (
      <div
        className={cn(styles.container, fullWidth && styles.fullWidth, className)}
      >
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
            {required && <span className={styles.required}>*</span>}
          </label>
        )}

        <div
          className={cn(
            styles.inputWrapper,
            styles[size],
            error && styles.error,
            disabled && styles.disabled,
            leftElement ? styles.hasLeftElement : undefined,
            rightElement ? styles.hasRightElement : undefined,
          )}
        >
          {leftElement && (
            <span className={styles.leftElement}>{leftElement}</span>
          )}

          <input
            ref={ref}
            id={inputId}
            className={styles.input}
            disabled={disabled}
            required={required}
            aria-invalid={!!error}
            aria-describedby={
              error
                ? `${inputId}-error`
                : helperText
                  ? `${inputId}-helper`
                  : undefined
            }
            {...props}
          />

          {rightElement && (
            <span className={styles.rightElement}>{rightElement}</span>
          )}
        </div>

        {error && (
          <span id={`${inputId}-error`} className={styles.errorMessage}>
            {error}
          </span>
        )}

        {!error && helperText && (
          <span id={`${inputId}-helper`} className={styles.helperText}>
            {helperText}
          </span>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
