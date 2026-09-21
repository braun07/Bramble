import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cn } from "../../utils/cn";
import styles from "./Button.module.scss";

export type ButtonVariant = "primary" | "ghost" | "white";
export type ButtonSize = "sm" | "md" | "lg";

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

type ButtonAsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  const classes = cn(styles.button, styles[variant], styles[size], className);

  if (props.href !== undefined) {
    return <a className={classes} {...props} />;
  }

  return <button className={classes} {...props} />;
}