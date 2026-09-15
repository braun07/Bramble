import { Button, Menu, CodeWindow } from '../components/index.ts';

function App() {

  const handleTranslate = () => {
    console.log("Translate clicked");
  };

  return (
    <>
      <Menu onTranslate={handleTranslate} />
      <div id="container" className="flex flex-col justify-center w-100 px-30 md:px-60 xxl:px-120">
        <section id="home" className="flex flex-col xl:flex-row items-center justify-between w-100">
          <div className="xl:max-w-46 flex flex-col gap-50">
            <h2 className='fw-600 text-40 sm:text-55 md:text-69 xl:text-40 xxl:text-55 exl:text-70 line-h-100'>
              <span className="text-bramble">Build</span> once.<br /> Scale <span className="text-bramble">everywhere</span>.
            </h2>
            <p className="fw-300 text-primary align-justify text-32 line-h-110 mb-10">
              Bramble provides a collection of reusable React components, utility classes, and styling foundations that simplify the development of modern web applications while promoting consistency across products and teams.
            </p>
            <div className="flex flex-col md:flex-row gap-20">
              <Button
                type="button"
                className="flex px-22 py-13 rounded-8 w-fit h-fit fw-300 text-24 xl:text-19 xxl:text-24 text-white bg-gradient-to-r from-bramble to-bramble-2"
              >
                View Components
              </Button>
              <Button
                type="button"
                className="flex px-22 py-13 rounded-8 w-fit h-fit fw-300 text-24 xl:text-19 xxl:text-24 text-white border-1 border-white border-solid"
              >
                Contact Us
              </Button>
            </div>
          </div>
          <CodeWindow
            className="ml-60 hidden xl:flex"
          />
        </section>
      </div>
    </>
  )
}

export default App
