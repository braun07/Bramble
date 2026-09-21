import { useTranslation } from "react-i18next";
import { cn } from "../../utils/cn";

export interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  const { t } = useTranslation();

  return (
    <footer
      className={cn(
        "flex items-center justify-between w-100 px-30 md:px-60 xxl:px-120 py-25 bg-gradient-to-r from-bramble to-bramble-2 fw-300 text-20 lg:text-28 line-h-140",
        className,
      )}
    >
      <span className="w-fit flex align-left">{t("footer.brand")}</span>
      <span className="w-fit flex align-right">{t("footer.copyright")}</span>
    </footer>
  );
}
