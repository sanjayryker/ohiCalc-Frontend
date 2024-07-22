import React, { Fragment } from "react";
import "./Sidebar.css";
import { SidebarCdiData } from "./SidebarData";
import { useNavigate } from "react-router-dom";

const SidebarCdi = ({keyIndScore}) => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="sidebar">
      <ul className="sidebar-list">
        {SidebarCdiData.map((value, index) => {
          return (
            <Fragment key={index}>
              <li
                className="row"
                onClick={() => { handleNavigation(value.path)}}
                id={window.location.pathname == value.link ? "active" : ""}
              >
                
                <div className="title"> {value.title} </div>
                {keyIndScore[index] && <div className="icon" id={window.location.pathname == value.link ? "actives" : ""}> Score: {keyIndScore[index]}</div>}
              </li>
            </Fragment>
          );
        })}
      </ul>
    </div>
  );
};

export default SidebarCdi;
