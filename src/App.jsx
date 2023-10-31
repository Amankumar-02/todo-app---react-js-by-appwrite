import { Toaster } from 'react-hot-toast'
import './App.css'
import {Outlet} from 'react-router-dom'

function App() {

  return (
    <>
    <Outlet/>
    <Toaster position='top-left'/>
    </>
  )
}

export default App
