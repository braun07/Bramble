import { useTranslation } from "react-i18next";
import heroImg from "../../assets/bramble.svg";
import home from "../../assets/home.svg";
import components from "../../assets/components.svg";
import contact from "../../assets/contact.svg";
import { cn } from "../../utils/cn";
import { Button } from "../Button";
import styles from "./Menu.module.scss";

export interface MenuProps {
  className?: string;
}

export function Menu({ className }: MenuProps) {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLanguage = i18n.language === "en" ? "pt" : "en";
    i18n.changeLanguage(newLanguage);
  };

  return (
    <nav
      className={cn(
        "flex items-center justify-between w-100 px-30 md:px-60 xxl:px-120 py-30 fixed top-0 bg-blur index-2",
        className,
      )}
    >
      <div className="flex gap-20 items-center">
        <img
          src={heroImg}
          className={styles.menuIcon}
          width="49"
          height="63"
          alt={t("nav.logoAlt")}
        />
        <span className="text-40 fw-700 hidden md:flex">Bramble</span>
      </div>

      <div className="flex gap-50 sm:gap-100 items-center">
        <ul className={cn("flex gap-30 sm:gap-40 items-center", styles.menuLinks)}>
          <li>
            <a href="#home" className="flex">
              <img
                src={home}
                className={styles.menuNavIcon}
                width="39"
                height="29"
                alt={t("nav.home")}
              />
            </a>
          </li>
          <li>
            <a href="#components" className="flex">
              <img
                src={components}
                className={styles.menuNavIcon}
                width="29"
                height="29"
                alt={t("nav.components")}
              />
            </a>
          </li>
          <li>
            <a href="#contact" className="flex">
              <img
                src={contact}
                className={styles.menuNavIcon}
                width="29"
                height="29"
                alt={t("nav.contact")}
              />
            </a>
          </li>
        </ul>

        <Button
          type="button"
          className={cn(
            "px-10 py-5 sm:px-20 sm:py-10 rounded-10 h-fit fw-300 text-20 text-primary bg-base-1 border-bramble border-2 border-solid",
            styles.languageButton,
            styles.buttonWidth,
          )}
          onClick={toggleLanguage}
        >
          {i18n.language === "en" ? "PT" : "EN"}
        </Button>
      </div>
    </nav>
  );
}
