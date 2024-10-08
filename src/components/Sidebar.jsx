import React, { Fragment, useState } from "react";
import "./Sidebar.css";
import { SidebarCdiData, SidebarEdiData, SidebarIdiData } from "./SidebarData";
import WeightModal from "./WeightModal";


const Sidebar = ({ keyIndScore, handleNavigation, keyScore, path, keyIndLength, user }) => {

  const sidebarDataset = { EDI: SidebarEdiData, CDI: SidebarCdiData, IDI: SidebarIdiData }
  const isChecked = localStorage.getItem('isChecked') === 'true'
  const [showModal, setShowModal] = useState(false)
  const selectedDataset = sidebarDataset[path]

  const navigation = (path) => {
    handleNavigation(path);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };


  return (
    <>
    <div className="sidebar">
      <ul className="sidebar-list">
        {selectedDataset.map((value, index) => {
          const currentLink = isChecked ? value.weight_link : value.link;

          return (
            <Fragment key={index}>
              <li
                className={`row ${window.location.pathname === currentLink ? "active" : ""}`}
                onClick={() => { navigation(isChecked ? value.weight_path : value.path) }}
              >
                <div className="title"> {value.title} </div>
                {(keyIndScore[index] || (keyScore !== undefined && keyScore !== null)) && <div className="icon" id={window.location.pathname === currentLink ? "actives" : ""}> Score: {keyScore !== null ? Number(keyScore).toFixed(6) : Number(keyIndScore[index]).toFixed(6)}</div>}
              </li>
            </Fragment>
          );
        })}
        {keyIndLength &&( 
          <li className="buttonBox">
            <button className="buttonB" onClick={() => setShowModal(true)}>Enter KeyIndicator Weights</button>
          </li>
        )}
      </ul>
    </div>
    <WeightModal show={showModal} handleClose={handleModalClose} selectedDataset={selectedDataset} path={path} user={user} />
    </>
  );
};

export default Sidebar;
