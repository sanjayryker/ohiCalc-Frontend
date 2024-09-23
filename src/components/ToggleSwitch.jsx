import React, { useState } from 'react';
import { Tooltip as ReactTooltip } from "react-tooltip";
import { IoInformationCircleSharp } from "react-icons/io5";
import './toggleSwitch.css'

const ToggleSwitch = ({isChecked,setIsChecked}) => {
  
  const handleToggle = () => {
    setIsChecked(!isChecked);
  };
  
  return (
    <>
    <div className="toggle-switch">
    <IoInformationCircleSharp data-tooltip-id="my-tooltip-1" style={{height:"25px", width:"20px", marginRight:"4px", cursor:"pointer", color:"grey"}} />
      <input
        type="checkbox"
        id="switch"
        checked={isChecked}
        onChange={handleToggle}
      />
      <label htmlFor="switch" className='switch'>
        {isChecked ? 'AAAA' : 'BBBB'}
      </label>
      <ReactTooltip
            id="my-tooltip-1"
            place="left"
            style={{fontSize:"11px"}}
            content={<>
            <h4 style={{ marginBottom: "8px", fontWeight: "bold", display:"flex", justifyContent:"center" }}>Toggle Switch</h4>
            <div style={{marginBottom:"5px"}}>AAAA - Calculate OHI using equal weightages </div>
            <div>BBBB - Calculate OHI using your own weightages</div>
            
          </> }/>
    </div>
    </>
  )
}

export default ToggleSwitch