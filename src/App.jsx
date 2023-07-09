import { useState } from 'react'
import './App.css'
import ChatWindow from './components/ChatWindow'

function App() {
  const [count, setCount] = useState(0)

  const penpal = {
    name: "John Smith",
    language: "EN",
    proficiency: 6
  };

  return (
    <>
      <ChatWindow penpal={penpal} />
    </>
  )
}

export default App
