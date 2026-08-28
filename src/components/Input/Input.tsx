import { cn } from "../../utils/cn";
import styles from "./Input.module.scss";

export type InputVariant = "primary" | "ghost";
export type InputSize = "sm" | "md" | "lg";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
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