import { useState } from 'react'
import Expenses from "./Expenses/Expenses"


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Expenses/>
    </>
  )
}

export default App
