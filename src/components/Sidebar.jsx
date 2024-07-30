import React, { Fragment } from "react";
import "./Sidebar.css";
import { SidebarCdiData, SidebarEdiData, SidebarIdiData } from "./SidebarData";

//This sidebar is dynamic and is mapped for all the keeIndicator pages

const Sidebar = ({keyIndScore,handleNavigation,keyScore,path}) => {

  // This dataset conatins all the datasets combined for dynamic change of sidebar data 
  const sidebarDataset = {EDI : SidebarEdiData, CDI: SidebarCdiData, IDI: SidebarIdiData}

  const isChecked = localStorage.getItem('isChecked') === 'true'

  const navigation = (path) => {
    handleNavigation(path)
  };

  return (
    <div className="sidebar">
      <ul className="sidebar-list">
        {sidebarDataset[path].map((value, index) => {

          // Find the appropriate link based on isChecked
          const currentLink = isChecked ? value.weight_link : value.link;

          return (
            <Fragment key={index}>
              <li
                className={`row ${window.location.pathname === currentLink  ? "active" : ""}`}
                onClick={() => {navigation(isChecked ? value.weight_path : value.path)}}
              >
                
                <div className="title"> {value.title} </div>
                {keyIndScore[index] || keyScore && <div className="icon" id={window.location.pathname === currentLink ? "actives" : ""}> Score: {keyScore !== "" ? keyScore: keyIndScore[index]}</div>}
                {/* <div> {`Score: ${keyIndScore[index]?keyIndScore[index]:'' }`} </div> */}
              </li>
            </Fragment>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
