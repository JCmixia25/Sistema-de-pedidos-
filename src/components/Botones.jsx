import React, { useState } from "react";
import "./Botones.css";
import { NavLink } from "react-router-dom";
import icono from "./icono.png";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";

export const Botones = ({ setSearchTerm, isBlinking }) => {
  const [searchInput, setSearchInput] = useState("");

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchInput(term);
    setSearchTerm(term); // Actualiza el término de búsqueda en tiempo real
  };

  const handleSearchSubmit = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      setSearchTerm(searchInput);
    }
  };

  return (
    <div className="contenedor-encabezados">
      <nav>
        <div className="div-contacto">
          <div className="tel-correo">
            <p className="datos">(502) 48407205</p>
          </div>
          <div className="tel-correo">
            <p id="seccion1" className="datos">cotizaciones@agrodigital.tech</p>
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
          <div className="inicio-sesion">
            <NavLink to="/login" className={`inicio-sesion-button ${isBlinking ? 'blinking' : ''}`}>
              <FaUser className="usuario-icono" />
              <p className="inicio-sesion-text">
                Iniciar
                <br />
                Sesión
              </p>
            </NavLink>
          </div>        
          <div className="carrito-compras">
            <NavLink to="/carrito" className="carrito-boton">
              <div className="icono-y-texto">
                <FaShoppingCart className="carrito-icono" />
                <p className="inicio-sesion-text">Mi Carrito</p>
              </div>
            </NavLink>
          </div>
        </div>
        <div className="div-link">
          <ul>
            <li className="li-var">
              <NavLink className="btn-nav" to="/productos">
                PRODUCTOS
              </NavLink>
            </li>
            <li>
              <NavLink className="btn-nav" to="/contact">
                SOBRE NOSOTROS
              </NavLink>
            </li>
            <li>
              <NavLink className="btn-nav" to="/">
                INICIO
              </NavLink>
            </li>
            <li>
              <NavLink className="btn-nav" to="/contacto">
                CONTACTO
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};