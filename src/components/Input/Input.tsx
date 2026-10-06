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
  labelClass?: string
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
      labelClass,
      ...props
    },
    ref,
  ) {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    return (
      <div
        data-testid="input-container"
        className={cn(styles.container, fullWidth && styles.fullWidth, className)}
      >
        {label && (
          <label htmlFor={inputId} className={cn(styles.label, labelClass)}>
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
          data-testid="input-wrapper"
        >
          {leftElement && (
            <span className={styles.leftElement} data-testid="input-leftElement">{leftElement}</span>
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
            <span className={styles.rightElement} data-testid="input-rightElement">{rightElement}</span>
          )}
        </div>

        {error && (
          <span id={`${inputId}-error`} className={styles.errorMessage} data-testid="input-error">
            {error}
          </span>
        )}

        {!error && helperText && (
          <span id={`${inputId}-helper`} className={styles.helperText} data-testid="input-helper">
            {helperText}
          </span>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
