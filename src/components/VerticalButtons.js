import React from "react";
import "./VerticalButtons.css";
import { NavLink } from "react-router-dom";

function VerticalButtons() {
  return (
    <div className="button-container">
      <NavLink className="vertical-button" to="/productos/Eléctricos">
        ELECTRICO
      </NavLink>
      <NavLink className="vertical-button" to="/productos/Mecánicos">
        MECANICA
      </NavLink>
      <NavLink className="vertical-button" to="/productos/Electrónicos">
        ELECTRONICA
      </NavLink>
      <NavLink className="vertical-button" to="/productos/Aspiración">
        ASPERCIÓN
      </NavLink>
      <NavLink className="vertical-button" to="/productos/Hidráulicos">
        HIDRAULICA
      </NavLink>
    </div>
  );
}

export default VerticalButtons;
