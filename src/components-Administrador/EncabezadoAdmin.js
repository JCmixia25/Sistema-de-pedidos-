import React, { useState } from "react";
import "../components-Administrador/EncabezadoAdmin.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import icono from "./icono.png";
import { FaSearch, FaUser, FaPowerOff } from "react-icons/fa";

export const EncabezadoAdmin = ({ setSearchTerm, isBlinking }) => {
  const { setEstado } = useAuth();
  const navigate = useNavigate();

  function cerrarSesion() {
    setEstado(false);
    localStorage.removeItem("login");
    localStorage.removeItem("rol");
    navigate("/");
  }

  const [searchInput, setSearchInput] = useState("");

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchInput(term);
    setSearchTerm(term);
  };

  const handleSearchSubmit = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      setSearchTerm(searchInput);
    }
  };

  return (
    <div>
      <nav>
        <div>
          <div className="div-contacto">
            <div className="tel-correo">
              <p className="datos">(502) 48407205</p>
            </div>
            <div className="tel-correo">
              <p className="datos">cotizaciones@agrodigital.tech</p>
            </div>
            <div className="tel-correo">
              <p className="pedidos">Mis pedidos</p>
            </div>
          </div>
          <div className="div-image-search">
            <div className="container-icono">
              <img src={icono} alt="Icono" className="icono" />
            </div>
            <div className="search-container">
              <input
                type="text"
                placeholder="Buscar un producto, una marca..."
                value={searchInput}
                onChange={handleSearchChange}
                onKeyPress={handleSearchSubmit}
                className="search-input"
              />
              <div className="container-icon-search">
                <FaSearch
                  className="search-iconn"
                  onClick={handleSearchSubmit}
                />
              </div>
            </div>

            <div className="div-user-actions">
              <button
                id="btnLogout"
                onClick={cerrarSesion}
                className="cerrar-sesion"
              >
                <FaPowerOff className="usuario-icono" />
                <p className="iniciar-sesion-text">Cerrar Sesión</p>
              </button>
            </div>
          </div>
          <div className="div-link">
            <ul>
            <li className="li-var">
                <NavLink className="btn-nav" to="/productos">
                  PRODUCTOS
                </NavLink>
              </li>
              <li className="li-var">
                <NavLink className="btn-nav" to="/agregarpro">
                  AGREGAR PRODUCTOS
                </NavLink>
              </li>
              <li>
                <NavLink className="btn-nav" to="/ControlPedidos">
                  CONTROL PEDIDOS
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};