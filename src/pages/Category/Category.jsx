import React from "react";
import './Category.css';
import { useNavigate } from 'react-router-dom';

const Category = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="category">
      <div className="category-container">
        <button onClick={() => handleNavigation("/EDI/keyInd1")}>EDI</button>
        <button onClick={() => handleNavigation("/IDI/keyInd1?current_tab=Ind1")}>IDI</button>
        <button onClick={() => handleNavigation("/CDI/keyInd1?current_tab=Ind1")}>CDI</button>
      </div>
    </div>
  );
};

export default Category;
