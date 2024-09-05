import React, { useState } from "react";
import "../components/Botones";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

export const Encabezado = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { setEstado} = useAuth();
  const navigate = useNavigate();

  function cerrarSesion(){
    setEstado(false);
    localStorage.removeItem("login");
    navigate("/");
  }

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
          <NavLink to="/register">PEDIDOS</NavLink>
        </li>
        <li>
          <NavLink to="/login">USUARIOS</NavLink>
        </li>
        <li>
          <NavLink to="/contact">EMPRESA</NavLink>
        </li>
        <li>
          {/* <NavLink to="/home">CERRAR SESION</NavLink> */}
          <button onClick={cerrarSesion}>CERRAR SESION</button>
        </li>
      </ul>
    </nav>
  );
};