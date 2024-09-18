import React from "react";
import "./VerticalButtons.css";
import { NavLink } from "react-router-dom";

function VerticalButtons() {
  return (
    <div className="button-container">
      <NavLink className="vertical-button" to="/productos/eléctricos">
        ELECTRICOS
      </NavLink>
      <NavLink className="vertical-button" to="/productos/mecánicos">
        MECANICA
      </NavLink>
      <NavLink className="vertical-button" to="/productos/electrónicos">
        ELECTRONICA
      </NavLink>
      <NavLink className="vertical-button" to="/productos/aspiración">
        ASPERCIÓN
      </NavLink>
      <NavLink className="vertical-button" to="/productos/hidráulicos">
        HIDRAULICOS
      </NavLink>
    </div>
  );
}

export default VerticalButtons;
