import React from "react";
import "./VerticalButtons.css";
import { NavLink } from "react-router-dom";

function VerticalButtons() {
  return (
    <div className="button-container">
      <NavLink className="vertical-button" to="/productos/electrico">
        ELECTRICOS
      </NavLink>
      <NavLink className="vertical-button" to="/productos/mecanica">
        MECANICA
      </NavLink>
      <NavLink className="vertical-button" to="/productos/electronica">
        ELECTRONICA
      </NavLink>
    </div>
  );
}

export default VerticalButtons;
