import React, { useState } from "react";
import "../components-private/Encabezado.css";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import icono from "./icono.png";
import { FaSearch, FaShoppingCart, FaUser, FaPowerOff } from "react-icons/fa"; // Importa iconos de carrito y usuario

export const Encabezado = () => {
  const { setEstado } = useAuth();
  const navigate = useNavigate();

  function cerrarSesion() {
    setEstado(false);
    localStorage.removeItem("login");
    navigate("/");
  }

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
  };

  const handleSearchSubmit = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      // Aquí puedes manejar la búsqueda
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
                value={searchTerm}
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

            <div className="carrito-compras">
              <NavLink to="/carrito" className="carrito-boton">
                <div className="icono-y-texto">
                  <FaShoppingCart className="carrito-icono" />
                  <p className="inicio-sesion-text">Mi Carrito</p>
                </div>
              </NavLink>
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
            <ul className={menuOpen ? "open" : ""}>
              <li className="li-var">
                <NavLink className="btn-nav" to="/productos">
                  PRODUCTOS
                </NavLink>
              </li>
              <li>
                <NavLink className="btn-nav" to="/informacion">
                  SOBRE NOSOTROS
                </NavLink>
              </li>
              <li>
                <NavLink className="btn-nav" to="/">
                  INICIO
                </NavLink>
              </li>
              
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
