import React from "react";
import './Category.css';
import { useNavigate } from 'react-router-dom';

const Category = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const data = [
    { id: 1, heading: 'EDI', abbr:"(External Drivers Index)", text: 'Used to asses the social, economic, cultural and other factors affecting One Health development', button: 'Calculate',path:"/EDI/keyInd1?current_tab=Ind1" },
    { id: 2, heading: 'IDI',abbr:"(Intrinsic Drivers Index)", text: 'Formed to assess One Health Practice at the interfaces of human helath, animal health and environment health', button: 'Calculate',path:"/IDI/keyInd1?current_tab=Ind1" },
    { id: 3, heading: 'CDI',abbr:"(Core Drivers Index)", text: 'Created to evaluate One Health implementation in the management of core scientific fields', button: 'Calculate',path:"/CDI/keyInd1?current_tab=Ind1" },
  ];

  const Card = ({ heading, abbr ,text, button, path }) => {
    return (
      <div className="cards">
        <h2 className="cards-heading">{heading}</h2>
        <div className="cards-textt">{abbr}</div>
        <p className="cards-text">{text}</p>
        <button className="cards-button" onClick={() =>handleNavigation(path)}>{button}</button>
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
    <div className="cards-list">
      {data.map(value => (
        <Card key={value.id} heading={value.heading} text={value.text} button={value.button} abbr={value.abbr} path = {value.path} />
      ))}
    </div>


  );
};

export default Category;
