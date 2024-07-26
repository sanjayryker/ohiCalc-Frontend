import React, { Fragment } from "react";
import "./Sidebar.css";
import { SidebarCdiData } from "./SidebarData";

const SidebarCdi = ({keyIndScore,handleNavigation,keyScore}) => {

  const navigation = (path) => {
    handleNavigation(path)
  };

  return (
    <div className="sidebar">
      <ul className="sidebar-list">
        {SidebarCdiData.map((value, index) => {
          return (
            <Fragment key={index}>
              <li
                className="row"
                onClick={() => {navigation(value.path)}}
                id={window.location.pathname == value.link ? "active" : ""}
              >
                
                <div className="title"> {value.title} </div>
                {keyIndScore[index] && <div className="icon" id={window.location.pathname == value.link ? "actives" : ""}> Score: {keyScore !== "" ? keyScore: keyIndScore[index]}</div>}
              </li>
            </Fragment>
          );
        })}
      </ul>
    </div>
  );
};

export default SidebarCdi;
