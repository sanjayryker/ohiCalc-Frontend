import React from "react";
import './Category.css';
import { useNavigate } from 'react-router-dom';

const Category = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const cars = [
    { id: 1, heading: 'EDI', abbr:"(External Drivers Index)", text: 'Used to asses the social, economic, cultural and other factors affecting One Health development', button: 'Calculate',path:"/EDI/keyInd1?current_tab=Ind1" },
    { id: 2, heading: 'IDI',abbr:"(Intrinsic Drivers Index)", text: 'Formed to assess One Health Practice at the interfaces of human helath, animal health and environment health', button: 'Calculate',path:"/IDI/keyInd1?current_tab=Ind1" },
    { id: 3, heading: 'CDI',abbr:"(Core Drivers Index)", text: 'Created to evaluate One Health implementation in the management of core scientific fields', button: 'Calculate',path:"/CDI/keyInd1?current_tab=Ind1" },
  ];

  const Card = ({ heading, abbr ,text, button, path }) => {
    return (
      <div className="car">
        <h2 className="car-heading">{heading}</h2>
        <div className="car-textt">{abbr}</div>
        <p className="car-text">{text}</p>
        <button className="car-button" onClick={() =>handleNavigation(path)}>{button}</button>
      </div>
    );
  };

  return (
    // <div className="category">
    //   <div className="category-container">
    //     <button onClick={() => handleNavigation("/EDI/keyInd1?current_tab=Ind1")}>EDI</button>
    //     <button onClick={() => handleNavigation("/IDI/keyInd1?current_tab=Ind1")}>IDI</button>
    //     <button onClick={() => handleNavigation("/CDI/keyInd1?current_tab=Ind1")}>CDI</button>
    //   </div>
    // </div>
    <div className="car-list">
      {cars.map(car => (
        <Card key={car.id} heading={car.heading} text={car.text} button={car.button} abbr={car.abbr} path = {car.path} />
      ))}
    </div>


  );
};

export default Category;
