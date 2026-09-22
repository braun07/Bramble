import { useTranslation } from "react-i18next";
import gitImg from "../assets/git.png";
import checkIcon from "../assets/check.svg";
import linkedinImg from "../assets/linkedin.png";
import mailImg from "../assets/mail.png";
import { Alert, Button, CodeWindow, ComponentHolder, ProfileDisplay } from "../components";
import { Footer } from "../components/Footer";
import { Menu } from "../components/Menu";
import { useCopyToClipboard } from "../hooks/useCopyToClipboard";
import { Loading } from "../components/Loading";

const CONTACT_EMAIL = "joaovitorbraun6@gmail.com";

function App() {
  const { t } = useTranslation();
  const { copied, copy } = useCopyToClipboard();

  return (
    <>
      <Menu />
      <div
        id="container"
        className="flex flex-col justify-center w-100 px-30 md:px-60 xxl:px-120 gap-60 sm:gap-90 my-130 sm:my-180 overflow-hidden"
      >
        <section
          id="home"
          className="flex flex-col xl:flex-row items-center justify-between w-100"
        >
          <div className="xl:max-w-46 flex flex-col gap-50 glow-content home">
            <h2 className="fw-600 text-30 sm:text-55 md:text-69 xl:text-40 xxl:text-55 exl:text-70 line-h-100">
              <span className="text-bramble">{t("hero.build")}</span>{" "}
              {t("hero.once")}.<br /> {t("hero.scale")}{" "}
              <span className="text-bramble">{t("hero.everywhere")}</span>.
            </h2>
            <p className="fw-300 text-primary align-justify text-20 sm:text-24 lg:text-32 line-h-110 mb-10">
              {t("hero.description")}
            </p>
            <div className="flex flex-col md:flex-row gap-20">
              <Button
                href="#components"
                className="flex px-22 py-13 rounded-8 w-fit h-fit fw-300 text-18 sm:text-24 xl:text-19 xxl:text-24 text-white bg-gradient-to-r from-bramble to-bramble-2"
              >
                {t("actions.viewComponents")}
              </Button>
              <Button
                href="#contact"
                className="flex px-22 py-13 rounded-8 w-fit h-fit fw-300 text-18 sm:text-24 xl:text-19 xxl:text-24 text-white border-1 border-white border-solid"
              >
                {t("contact.title")} {t("contact.us")}
              </Button>
            </div>
          </div>
          <CodeWindow className="ml-60 hidden xl:flex" />
        </section>
        <section id="components" className="flex flex-col gap-60 sm:gap-90 items-center">
          <h3 className="fw-600 text-26 lg:text-32 border-bramble border-solid border-bottom-3 line-h-180">
            {t("components.title")}
          </h3>

          <div className="glow-content component-list">
            <div className="flex items-center justify-center bg-code-2 py-20 px-20 sm:px-100 sm:py-100 rounded-15 gap-35 w-100 max-w-100 wrap component-listing overscroll-contain">
              <ComponentHolder title={t("components.button")}>
                <Button variant="white" className="px-32 py-10 default-shadow">
                  {t("components.button")}
                </Button>
              </ComponentHolder>
              <ComponentHolder title={t("components.profileDisplay")}>
                <ProfileDisplay 
                  photoUrl="https://mockmind-api.uifaces.co/content/human/222.jpg" 
                  welcomeMessage="Welcome!"
                  userName="Jhon Doe"
                />
              </ComponentHolder>
              <ComponentHolder title={t("components.alert")}>
                <Alert variant="success" icon={checkIcon} message="Form saved!" dismissible />
              </ComponentHolder>
              <ComponentHolder title={t("components.loading")}>
                <Loading />
              </ComponentHolder>
              <ComponentHolder title={t("components.actionButton")}>
                <Button className="bg-white w-fit rounded-4 text-black px-32 py-10 default-shadow">
                  {t("components.button")}
                </Button>
              </ComponentHolder>
              <ComponentHolder title={t("components.toggle")}>
                <Button className="bg-white w-fit rounded-4 text-black px-32 py-10 default-shadow">
                  {t("components.button")}
                </Button>
              </ComponentHolder>
              <ComponentHolder title={t("components.checkbox")}>
                <Button className="bg-white w-fit rounded-4 text-black px-32 py-10 default-shadow">
                  {t("components.button")}
                </Button>
              </ComponentHolder>
              <ComponentHolder title={t("components.input")}>
                <Button className="bg-white w-fit rounded-4 text-black px-32 py-10 default-shadow">
                  {t("components.button")}
                </Button>
              </ComponentHolder>
            </div>
          </div>
        </section>
        <section id="contact" className="flex flex-col gap-60 sm:gap-90 items-center w-100">
          <h3 className="fw-600 text-26 lg:text-32 border-bramble border-solid border-bottom-3 line-h-180">
            {t("contact.title")}{" "}
            <span className="text-bramble">{t("contact.us")}</span>
          </h3>

          <div className="flex flex-col lg:flex-row justify-center lg:justify-between wrap gap-30 w-100 items-center contact-us-container">
            <Button
              href="https://www.linkedin.com/in/joao-braun-509490234/"
              target="_blank"
              className="flex items-center px-30 py-14 rounded-8 bg-bramble w-fit h-fit fw-500 text-14 md:text-20 lg:text-24 gap-15"
            >
              <img src={linkedinImg} alt={t("contact.linkedin")} height={36} width={36} />
              <span>{t("contact.linkedin")}</span>
            </Button>
            <Button
              onClick={() => copy(CONTACT_EMAIL)}
              aria-live="polite"
              className="flex items-center px-30 py-17 rounded-8 bg-bramble w-fit h-fit fw-500 text-14 md:text-20 lg:text-24 gap-15"
            >
              <img src={mailImg} alt={t("contact.email")} height={30} width={36} />
              <span>{copied ? t("common.copied") : CONTACT_EMAIL}</span>
            </Button>
            <Button
              href="https://github.com/braun07"
              target="_blank"
              className="flex items-center px-30 py-14 rounded-8 bg-bramble w-fit h-fit fw-500 text-14 md:text-20 lg:text-24 gap-15"
            >
              <img src={gitImg} alt={t("contact.github")} height={36} width={36} />
              <span>{t("contact.github")}</span>
            </Button>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default App;
