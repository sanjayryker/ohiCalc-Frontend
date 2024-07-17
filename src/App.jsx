import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Category from './pages/Category/Category'
import Sidebar from './components/Sidebar'
import KeyInd1 from './pages/KeyIndicators/KeyInd1'
import './App.css'
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min';

const App = () => {
  return (
    <div className='app'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/category' element={<Category/>} />
        <Route path='/EDI/keyInd1' element={<KeyInd1/>} />
      </Routes>
    </div>
  )
}

export default App