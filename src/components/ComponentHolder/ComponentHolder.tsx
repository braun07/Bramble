import type { ReactNode } from "react";
import styles from "./ComponentHolder.module.scss";
import { cn } from "../../utils/cn";

export interface ComponentHolderProps {
    children?: ReactNode;
    title?: string;
}

export function ComponentHolder({ children, title }: ComponentHolderProps) {
    return (
        <div className={cn("px-20 py-20 rounded-15 hover:bg-code-1 flex flex-col gap-15 h-fit flex-grow", styles.CHolder_Width)}>
            <div className={cn("w-100 px-20 py-35 flex items-center justify-center bg-vibrant-dark rounded-10", styles.CHolder_Height)}>
                {children}
            </div>
            <span>{title}</span>
        </div>
    );
}