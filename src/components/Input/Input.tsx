import type { InputHTMLAttributes } from "react";
import { cn } from "../../utils/cn";
import styles from "./Input.module.scss";

export type InputVariant = "primary" | "ghost";
export type InputSize = "sm" | "md" | "lg";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  variant?: InputVariant;
  size?: InputSize;
}

export function Input({
  variant = "primary",
  size = "md",
  className,
  ...props
}: InputProps) {
  return (
    <input
      className={cn(styles.input, styles[variant], styles[size], className)}
      {...props}
    />
  );
}
