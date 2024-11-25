import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Calendar from "./components/GymCalendar/GymCalendar"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Calendar />
      </div>   
    </>
  )
}

export default App
