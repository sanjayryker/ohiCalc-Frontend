import React, { useEffect, useState } from "react";
import "./Navbar.css";
import icon from '../assets/nav_icon.png'
import profile_icon from '../assets/nav_user_icon.png'
import { Link, useLocation } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {

    const [menu,setMenu] = useState('')
    const {logout} = useLogout()
    const {user} = useAuthContext()
    const location = useLocation(); 

    const handleLogout =() =>{
        logout()
    }
 
  return<> { location.pathname == '/signinVerification/:verifyToken' ? <></> : 
  <div className="navbar">
    
    <div className="nav-left">
        <img src={icon} alt="icon" style={{height:'30px'}} className="nav-logo"/>
        <Link to="/category" style={{color:"white"}}> OHI Calculator </Link>
    </div>
    {location.pathname == '/login' ? <></> : <ul className="nav-menu">
        <li onClick={() =>{setMenu('home')}} className={menu === 'home' ? 'active' : ''}> Home </li>
        <li onClick={() =>{setMenu('ohi')}} className={menu === 'ohi' ? 'active' : ''}> OHI Tree </li>
        <li onClick={() =>{setMenu('chart')}} className={menu === 'chart' ? 'active' : ''}>  Chart </li>
    </ul>}
    {/* <img src={profile_icon} className="profile-icon" alt="profile icon" style={{height:"30px"}}></img> */}

    {user && <div className="nav_name">
        <span>{user.email}</span>
        <Link onClick={handleLogout} className="nav-button"> Logout</Link>
    </div>}
    {!user && location.pathname !== '/login' && <div>
        <Link to='/login' className="nav-button">Log-in</Link>
    </div>}
    </div>}
    </>
};

export default Navbar;
