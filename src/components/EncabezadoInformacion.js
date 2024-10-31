import React, { useState } from "react";
import "../components/EncabezadoInformacion.css";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import icono from "./icono.png";
import { FaSearch, FaShoppingCart, FaUser, FaPowerOff } from "react-icons/fa";

export const EncabezadoInformacion = ({ setSearchTerm, isBlinking}) => {
  const { setEstado } = useAuth();
  const navigate = useNavigate();


  function cerrarSesion() {
    setEstado(false);
    localStorage.removeItem("login");
    localStorage.removeItem("rol");
    localStorage.removeItem("estado2");
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
            
            </div>
          </div>
          <div className="div-image-search">
            <div className="container-icono">
              <img src={icono} alt="Icono" className="icono" />
            </div>

            <div className="carrito-compras">
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
         
        </div>
      </nav>
    </div>
  );
};
