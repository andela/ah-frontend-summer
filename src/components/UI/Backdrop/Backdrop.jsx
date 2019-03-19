import React from "react";
import "../../../assets/styles/Backdrop.scss";

const backdrop = (props) => (
    props.show ? <div className="Backdrop" onClick={props.clicked}></div> : null
);

export default backdrop;
