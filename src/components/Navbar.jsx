import React, { useState } from "react";
import "./Navbar.css";
import icon from '../assets/nav_icon.ico'
import profile_icon from '../assets/nav_user_icon.png'

const Navbar = () => {

    const [menu,setMenu] = useState('')

  return <div className="navbar">
    
    <div className="nav-left">
        <img src={icon} alt="icon" style={{height:'30px'}} className="nav-logo"/>
        <div> OHI Calculator </div>
    </div>
    <ul className="nav-menu">
        <li onClick={() =>{setMenu('home')}} className={menu === 'home' ? 'active' : ''}> Home </li>
        <li onClick={() =>{setMenu('ohi')}} className={menu === 'ohi' ? 'active' : ''}> OHI Tree </li>
        <li onClick={() =>{setMenu('chart')}} className={menu === 'chart' ? 'active' : ''}>  Chart </li>
    </ul>
    {/* <img src={profile_icon} className="profile-icon" alt="profile icon" style={{height:"30px"}}></img> */}
    <button className="nav-button"> sign in </button>
    </div>;
};

export default Navbar;
