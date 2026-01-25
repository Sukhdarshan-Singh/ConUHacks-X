import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Computer from './pages/Computer'; 
import Home from './pages/Home'; 
import Intro from './pages/Intro'; 
import Navbar from './component/Navbar';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element = {<Home />}/>
        <Route path="/computer" element = {<Computer/>}/>
        <Route path="/intro" element = {<Intro/>}/>
        <Route path="*" element = {<h2>404 Not Found</h2>} />
      </Routes>
      <Navbar />
    </>
  )
}

export default App
