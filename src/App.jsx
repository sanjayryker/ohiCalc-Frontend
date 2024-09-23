import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import { BrowserRouter, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
import Home from './pages/Home/Home'
import Category from './pages/Category/Category'
import EDI from './pages/KeyIndicators/EDI'
import IDI from './pages/KeyIndicators/IDI'
import CDI from './pages/KeyIndicators/CDI'
import './App.css'
import ToggleSwitch from './components/ToggleSwitch'
import EDI_weight from './pages/KeyIndicators/EDI-weight'
import IDI_weight from './pages/KeyIndicators/IDI-weight'
import CDI_weight from './pages/KeyIndicators/CDI-weight'
import Login from './pages/Login/Login'
import ResetPassword from './pages/ResetPassword/ResetPassword'
import SigninVerification from './pages/SigninVerification/SigninVerification'


export const URL = import.meta.env.VITE_SERVER_URL


const App = () => {
  const {user} = useAuthContext()

    
    // if (user === null) {
    //   console.log("no USER")
    //   return <div></div>
    // }
    

  return (
    <div className='app'>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          {/* <Route path='/' element={<Navigate to='/category'/>} />  */}
          <Route path='/login' element={!user ? <Login/> : <Navigate to='/category'/> } />
          <Route path='/category' element={ user ? <Category/> : <Navigate to='/login'/> } />
          <Route path='/EDI/:page' element={ user ? <EDI/> : <Navigate to='/login'/> } />
          <Route path='/IDI/:page' element={ user ? <IDI/> : <Navigate to='/login'/>} />
          <Route path='/CDI/:page' element={ user ? <CDI/> : <Navigate to='/login'/>} />
          <Route path='/EDI/weight/:page' element={ user ? <EDI_weight/> : <Navigate to='/login'/>}/>
          <Route path='/IDI/weight/:page' element={ user ? <IDI_weight/> : <Navigate to='/login'/>}/>
          <Route path='/CDI/weight/:page' element={user ? <CDI_weight/> : <Navigate to='/login'/>}/>
          <Route path='/reset_password/:id/:token' element={<ResetPassword/>} />
          <Route path='/signinVerification/:verifyToken' element={<SigninVerification/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App