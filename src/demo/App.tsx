import { useState } from 'react'
import heroImg from '../assets/bramble.svg'
import {Button} from '../components/index.ts'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center" className="flex flex-col items-center justify-center m-auto">
        <img src={heroImg} className="base" width="170" height="179" alt="" />

        <Button
          type="button"
          className="flex mt-10 rounded-1"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </Button>
      </section>
    </>
  )
}

export default App
