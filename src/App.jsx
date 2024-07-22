import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Category from './pages/Category/Category'
import KeyInd1 from './pages/KeyIndicators/KeyInd1'
import './App.css'

export const URL = import.meta.env.VITE_SERVER_URL
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min';

const App = () => {
  return (
    <div className='app'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/category' element={<Category/>} />
        <Route path='/EDI/:page' element={<KeyInd1/>} />
      </Routes>
    </div>
  )
}

export default App