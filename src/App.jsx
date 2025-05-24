import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Product from './component/Product'
import Login from './component/Login'
import Navbar from './component/Navbar'

function App() {
  const [count, setCount] = useState(0)
  const [uid, setUid] = useState("")

  return (
    <>
 
    <Login setUid={setUid} />
      <Product uid={uid}/>
    </>
  )
}

export default App
