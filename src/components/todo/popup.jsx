import './css/todo.css';
import React, {useState, useEffect} from "react";


function Popup(props){
    useEffect(() => {})

    return (
      <div className="popup-box">
        <div className="box">
          <span className="close-icon" onClick={props.handleClose}>x</span>
          {props.content}
        </div>
      </div>
    );
  };


export {Popup}