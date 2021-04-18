import React from "react";
 
const Popup = props => {
  return (
    <div className="popup-wrapper">
      <div className="popup-content">
        <span className="close-icon" onClick={props.handleClose}>x</span>
        {props.content}
      </div>
    </div>
  );
};
 
export default Popup;