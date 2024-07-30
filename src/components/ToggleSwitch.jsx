import React, { useState } from 'react';
import './toggleSwitch.css'

const ToggleSwitch = ({isChecked,setIsChecked}) => {
  
  const handleToggle = () => {
    setIsChecked(!isChecked);
  };
  
  return (
    <div className="toggle-switch">
      <input
        type="checkbox"
        id="switch"
        checked={isChecked}
        onChange={handleToggle}
      />
      <label htmlFor="switch">
        {isChecked ? 'On' : 'Off'}
      </label>
    </div>
  )
}

export default ToggleSwitch