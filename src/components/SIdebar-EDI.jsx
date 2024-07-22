import React, { Fragment } from "react";
import "./Sidebar.css";
import { SidebarEdiData } from "./SidebarData";
import { useNavigate } from "react-router-dom";

const SidebarEdi = ({keyIndScore}) => {
  
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="sidebar">
      <ul className="sidebar-list">
        {SidebarEdiData.map((value, index) => {
          return (
            <Fragment key={index}>
              <li
                className="row"
                onClick={() => { handleNavigation(value.path)}}
                id={window.location.pathname == value.link ? "active" : ""}
              >
                
                <div className="title"> {value.title} </div>
                {keyIndScore[index] && <div className="icon" id={window.location.pathname == value.link ? "actives" : ""}> Score: {keyIndScore[index]}</div>}
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
