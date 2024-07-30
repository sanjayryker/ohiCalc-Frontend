import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Category from './pages/Category/Category'
import EDI from './pages/KeyIndicators/EDI'
import IDI from './pages/KeyIndicators/IDI'
import CDI from './pages/KeyIndicators/CDI'
import './App.css'
import ToggleSwitch from './components/ToggleSwitch'
import EDI_weight from './pages/KeyIndicators/EDI-weight'


export const URL = import.meta.env.VITE_SERVER_URL
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min';

const App = () => {
  return (
    <div className='app'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<ToggleSwitch/>} /> 
        <Route path='/category' element={<Category/>}/>
        <Route path='/EDI/:page' element={<EDI/>} />
        <Route path='/IDI/:page' element={<IDI/>} />
        <Route path='/CDI/:page' element={<CDI/>} />
        <Route path='/EDI/weight/:page' element={<EDI_weight/>}/>
      </Routes>
    </div>
  )
}

export default App