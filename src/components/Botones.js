import React, { useState } from "react";
import "./Botones.css";
import { Link, NavLink } from "react-router-dom";

export const Botones = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav>
      <Link to="/" className="title">
        {/* Agregar aquí el contenido del título */}
      </Link>
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink to="/home">INICIO</NavLink>
        </li>
        <li>
          <NavLink to="/register">REGISTRARSE</NavLink>
        </li>
        <li>
          <NavLink to="/login">INICIAR SESIÓN</NavLink>
        </li>
        <li>
          <NavLink to="/contact">CONTACTENOS</NavLink>
        </li>
        
      </ul>
    </nav>
  );
};