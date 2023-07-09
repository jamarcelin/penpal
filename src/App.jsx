import { useState } from 'react'
import './App.css'
import ChatWindow from './components/ChatWindow'

function App() {
  const [count, setCount] = useState(0)

  const penpal = {
    name: "Jean Legrand",
    language: "FR",
    proficiency: 6
  };

  const chat = [
    { sender: 'User', content: 'Hello' },
    { sender: 'Jean', content: 'Bonjour' }
  ];

  return (
    <>
      <ChatWindow penpal={penpal} chat={chat} />
    </>
  )
}

export default App
