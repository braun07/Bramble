import { Button, Menu, CodeWindow, Footer } from '../components/index.ts';
import { useTranslation } from 'react-i18next';
import linkedinImg from '../assets/linkedin.png';
import gitImg from '../assets/git.png';
import mailImg from '../assets/mail.png';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard.ts';

function App() {
  const { t } = useTranslation();
  const { copied, copy } = useCopyToClipboard();

  return (
    <>
      <Menu />
      <div id="container" className="flex flex-col justify-center w-100 px-30 md:px-60 xxl:px-120 gap-60 sm:gap-90 my-130 sm:my-180">
        <section id="home" className="flex flex-col xl:flex-row items-center justify-between w-100">
          <div className="xl:max-w-46 flex flex-col gap-50">
            <h2 className='fw-600 text-30 sm:text-55 md:text-69 xl:text-40 xxl:text-55 exl:text-70 line-h-100'>
              <span className="text-bramble">{t("Build")}</span> {t("once")}.<br /> {t("Scale")} <span className="text-bramble">{t("everywhere")}</span>.
            </h2>
            <p className="fw-300 text-primary align-justify text-20 sm:text-24 lg:text-32 line-h-110 mb-10">
              {t("Bramble_provides")}
            </p>
            <div className="flex flex-col md:flex-row gap-20">
              <Button
                href="#components"
                className="flex px-22 py-13 rounded-8 w-fit h-fit fw-300 text-18 sm:text-24 xl:text-19 xxl:text-24 text-white bg-gradient-to-r from-bramble to-bramble-2"
              >
                {t("View Components")}
              </Button>
              <Button
                href="#contact"
                className="flex px-22 py-13 rounded-8 w-fit h-fit fw-300 text-18 sm:text-24 xl:text-19 xxl:text-24 text-white border-1 border-white border-solid"
              >
                {t("Contact")} {t("Us")}
              </Button>
            </div>
          </div>
          <CodeWindow
            className="ml-60 hidden xl:flex"
          />
        </section>
        <section id="components" className="flex flex-col gap-60 sm:gap-90 items-center">
          <h3 className="fw-600 text-26 lg:text-32 border-bramble border-solid border-bottom-3 line-h-180">{t("Components")}</h3>

          <div className="flex bg-code-2 px-100 py-100 rounded-20 gap-40"></div>
        </section>
        <section id="contact" className="flex flex-col gap-60 sm:gap-90 items-center w-100">
          <h3 className="fw-600 text-26 lg:text-32 border-bramble border-solid border-bottom-3 line-h-180">{t("Contact")} <span className="text-bramble">{t("Us")}</span></h3>

          <div className="flex flex-col lg:flex-row justify-center lg:justify-between wrap gap-30 w-100 items-center contact-us-container">
            <Button
              href="https://www.linkedin.com/in/joao-braun-509490234/"
              target="_blank"
              className="flex items-center px-30 py-14 rounded-8 bg-bramble w-fit h-fit fw-500 text-14 md:text-20 lg:text-24 gap-15"
            >
              <img src={linkedinImg} alt="LinkedIn" height={36} width={36} />
              <span>Linkedin</span>
            </Button>
            <Button
              onClick={() => copy("joaovitorbraun6@gmail.com")}
              aria-live="polite"
              className="flex items-center px-30 py-17 rounded-8 bg-bramble w-fit h-fit fw-500 text-14 md:text-20 lg:text-24 gap-15"
            >
              <img src={mailImg} alt="Email" height={30} width={36} />
              <span>{copied ? t("Copied") : "joaovitorbraun6@gmail.com"}</span>
            </Button>
            <Button
              href="https://github.com/braun07"
              target="_blank"
              className="flex items-center px-30 py-14 rounded-8 bg-bramble w-fit h-fit fw-500 text-14 md:text-20 lg:text-24 gap-15"
            >
              <img src={gitImg} alt="GitHub" height={36} width={36} />
              <span>GitHub</span>
            </Button>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}

export default App
