import React, { useState } from "react";
import "./Navbar.css";
import icon from '../assets/nav_icon.png'
import profile_icon from '../assets/nav_user_icon.png'
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {

    const [menu,setMenu] = useState('')
    const {logout} = useLogout()
    const {user} = useAuthContext()

    const handleLogout =() =>{
        logout()
    }

  return <div className="navbar">
    
    <div className="nav-left">
        <img src={icon} alt="icon" style={{height:'30px'}} className="nav-logo"/>
        <Link to="/category" style={{color:"white"}}> OHI Calculator </Link>
    </div>
    <ul className="nav-menu">
        <li onClick={() =>{setMenu('home')}} className={menu === 'home' ? 'active' : ''}> Home </li>
        <li onClick={() =>{setMenu('ohi')}} className={menu === 'ohi' ? 'active' : ''}> OHI Tree </li>
        <li onClick={() =>{setMenu('chart')}} className={menu === 'chart' ? 'active' : ''}>  Chart </li>
    </ul>
    {/* <img src={profile_icon} className="profile-icon" alt="profile icon" style={{height:"30px"}}></img> */}

    {user && <div>
        <span>{user.email}</span>
        <Link onClick={handleLogout} className="nav-button"> Logout</Link>
    </div>}
    {!user && <div>
        <Link to='/login' className="nav-button">Log-in</Link>
        <Link to='/signup' className="nav-button">sign-in</Link>
    </div>}
    </div>;
};

export default Navbar;
