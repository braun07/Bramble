import { useState } from 'react';
import {Button, Menu} from '../components/index.ts';

function App() {
  const [count, setCount] = useState(0);

  const handleTranslate = () => {
    console.log("Translate clicked");
  };

  return (
    <>
      <Menu onTranslate={handleTranslate} />
      <section id="center" className="flex flex-col items-center justify-center m-auto w-80">
        <Button
          type="button"
          className="flex mb-200 rounded-4"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </Button>
      </section>
    </>
  )
}

export default App
