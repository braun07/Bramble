import { cn } from "../../utils/cn";
import styles from "./Input.module.scss";

export type InputVariant = "primary" | "ghost";
export type InputSize = "sm" | "md" | "lg";

export interface InputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "size"
  > {
  size?: InputSize;
  variant?: InputVariant;
}

export function Input({
  variant = "primary",
  size = "md",
  className,
  ...props
}: InputProps) {
  return (
    <Input
      className={cn(
        styles.Input,
        styles[variant],
        styles[size],
        className
      )}
      {...props}
    />
  );
}