import { useState } from 'react'
import heroImg from '../assets/bramble.svg'
import {Button} from '../components/index.ts'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <img src={heroImg} className="base" width="170" height="179" alt="" />

        <Button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </Button>
      </section>
    </>
  )
}

export default App
