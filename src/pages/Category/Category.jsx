import React, { useEffect, useState } from "react";
import './Category.css';
import { useNavigate } from 'react-router-dom';
import {URL} from '../../App'
import axios from "axios";
import ToggleSwitch from "../../components/ToggleSwitch";

const Category = () => {

  const [data,setData] = useState({})
  const [isChecked, setIsChecked] = useState(() => {
    const saved = localStorage.getItem('isChecked');
    return saved === 'true'; 
  }); // State for button toggle
  console.log(isChecked)
  const [mapData, setMapData] = useState([
    { id: 1, heading: 'EDI', abbr: "(External Drivers Index)", text: 'Used to asses the social, economic, cultural and other factors affecting One Health development', button: 'Calculate', path: "/EDI/keyInd1?current_tab=Ind1" , score: '' },
    { id: 2, heading: 'IDI', abbr: "(Intrinsic Drivers Index)", text: 'Formed to assess One Health Practice at the interfaces of human health, animal health and environment health', button: 'Calculate', path: "/IDI/keyInd1?current_tab=Ind1", score: '' },
    { id: 3, heading: 'CDI', abbr: "(Core Drivers Index)", text: 'Created to evaluate One Health implementation in the management of core scientific fields', button: 'Calculate', path: "/CDI/keyInd1?current_tab=Ind1", score: '' },
  ]);
  
  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path);
  };

  useEffect(() =>{
    fetchData()
  },[])

  // Update mapData whenever isChecked changes
  useEffect(() => {
    setMapData(prevData => prevData.map(item => {
      if (item.heading === 'EDI') {
        return { ...item, path: !isChecked ? "/EDI/keyInd1?current_tab=Ind1" : "/EDI/weight/keyInd1?current_tab=Ind1" };
      } else if (item.heading === 'IDI') {
        return { ...item, path: !isChecked ? "/IDI/keyInd1?current_tab=Ind1" : "/IDI/weight/keyInd1?current_tab=Ind1" };
      } else if (item.heading === 'CDI') {
        return { ...item, path: !isChecked ? "/CDI/keyInd1?current_tab=Ind1" : "/CDI/weight/keyInd1?current_tab=Ind1" };
      } else {
        return item;
      }
    }));
    localStorage.setItem('isChecked',isChecked)
  }, [isChecked]);


  const fetchData = async() =>{
  
    try{
    const response = await axios.get(`${URL}/api/CategoryScore/all`)
    console.log(response)
    const fetchedData = response.data;

    setData(response.data)

    //Update mapData with the scores we fetched

    setMapData((prevData) => prevData.map((item) =>{
      if (item.heading === 'EDI') {
        return { ...item, score: fetchedData.ediScore };
      } else if (item.heading === 'IDI') {
        return { ...item, score: fetchedData.idiScore };
      } else if (item.heading === 'CDI') {
        return { ...item, score: fetchedData.cdiScore };
      } else {
        return item;
      }
    }))
  }catch(err){
    console.log(err.message)
  }
  } 

  return (
    <>
      <ToggleSwitch isChecked={isChecked} setIsChecked={setIsChecked} />
      <div className="cards-list">
        {mapData.map((value) => (
          <div className="cards" key={value.id}>
            <h2 className="cards-heading">{value.heading}</h2>
            <div className="cards-abbr">{value.abbr}</div>
            <p className="cards-text">{value.text}</p>
            <p className="cards-score">Score: {value.score}</p>
            <button className="cards-button" onClick={() => handleNavigation(value.path)}>{value.button}</button>
          </div>
        ))}
      </div>
      { data.OhiScore ? <div className="ohi-score">OHI Score : {data?.OhiScore}</div> : <></> }
      
    </>


  );
};

export default Category;
