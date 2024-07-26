import React, { Fragment } from "react";
import "./Sidebar.css";
import { SidebarEdiData } from "./SidebarData";

const SidebarEdi = ({keyIndScore,handleNavigation,keyScore}) => {
  
  const navigation = (path) => {
    handleNavigation(path)
  };

  return (
    <div className="sidebar">
      <ul className="sidebar-list">
        {SidebarEdiData.map((value, index) => {
          return (
            <Fragment key={index}>
              <li
                className={`row ${window.location.pathname == value.link ? "active" : ""}`}
                onClick={() => {navigation(value.path)}}
                id={window.location.pathname == value.link ? "active" : ""}
              >
                
                <div className="title"> {value.title} </div>
                {keyIndScore[index] && <div className="icon" id={window.location.pathname == value.link ? "actives" : ""}> Score: {keyScore !== "" ? keyScore: keyIndScore[index]}</div>}
                {/* <div> {`Score: ${keyIndScore[index]?keyIndScore[index]:'' }`} </div> */}
              </li>
            </Fragment>
          );
        })}
      </ul>
    </div>
  );
};

export default SidebarEdi;
