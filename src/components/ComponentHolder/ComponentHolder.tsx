import type { ReactNode } from "react";
import { cn } from "../../utils/cn";
import styles from "./ComponentHolder.module.scss";

export interface ComponentHolderProps {
  children?: ReactNode;
  title?: string;
  className?: string;
}

export function ComponentHolder({
  children,
  title,
  className,
}: ComponentHolderProps) {
  return (
    <div
      className={cn(
        "px-20 py-20 rounded-15 hover:bg-code-1 flex flex-col gap-15 h-fit flex-grow",
        styles.componentHolder,
        className,
      )}
    >
      <div
        className={cn(
          "w-100 px-20 py-35 flex items-center justify-center bg-vibrant-dark rounded-10",
          styles.componentHolderPreview,
        )}
      >
        {children}
      </div>
      <span>{title}</span>
    </div>
  );
}
