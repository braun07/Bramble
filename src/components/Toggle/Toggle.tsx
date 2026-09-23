import { forwardRef, useState } from "react";
import type { ButtonHTMLAttributes, MouseEvent } from "react";
import { cn } from "../../utils/cn";
import styles from "./Toggle.module.scss";

export type ToggleSize = "sm" | "md" | "lg";

export interface ToggleProps
  extends Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "onChange" | "role" | "type"
  > {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  size?: ToggleSize;
  thumbClassName?: string;
}

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  function Toggle(
    {
      checked,
      defaultChecked = false,
      onChange,
      onClick,
      size = "md",
      disabled,
      className,
      thumbClassName,
      ...props
    },
    ref,
  ) {
    const [inner, setInner] = useState(defaultChecked);
    const isControlled = checked !== undefined;
    const isOn = isControlled ? checked : inner;

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
      if (e.defaultPrevented || disabled) return;
      const next = !isOn;
      if (!isControlled) setInner(next);
      onChange?.(next);
    };

    return (
      <button
        {...props}
        ref={ref}
        type="button"
        role="switch"
        aria-checked={isOn}
        disabled={disabled}
        className={cn(
          styles.toggle,
          styles[size],
          isOn && styles.on,
          "default-shadow relative cursor-pointer",
          className,
        )}
        onClick={handleClick}
      >
        <span className={cn(styles.thumb, thumbClassName)} />
      </button>
    );
  },
);

Toggle.displayName = "Toggle";