import React, { useState } from "react";
import "./Botones.css";
import { NavLink } from "react-router-dom";
import icono from "./icono.png";
import { FaSearch, FaShoppingCart } from "react-icons/fa"; // Importa el icono de carrito
import agricultura from "../imagenes/agricultura.jpg";
import cosechadora from "../imagenes/cosechadora.jpg";
import carreta from "../imagenes/carreta.jpg";
import hercules from "../imagenes/hercules.jpg";
import plataforma from "../imagenes/plataforma.jpg";

const categories = [
  {
    name: "Fertilizantes",
    products: [
      { id: 1, name: "Liquido", image: agricultura },
      { id: 2, name: "Granulado", image: cosechadora },
    ],
  },
  {
    name: "Herbicidas",
    products: [
      { id: 3, name: "Residuales", image: carreta },
      { id: 4, name: "Foliares", image: hercules },
    ],
  },
  {
    name: "Sensores",
    subcategories: [
      {
        name: "Suelo",
        products: [
          { id: 5, name: "Sensor de Humedad", image: plataforma },
          { id: 6, name: "Sensor de pH", image: agricultura },
        ],
      },
      {
        name: "Clima",
        products: [
          { id: 7, name: "Termometro", image: cosechadora },
          { id: 8, name: "Higrómetro", image: hercules },
        ],
      },
      {
        name: "Planta",
        products: [{ id: 9, name: "Sensor de Luz", image: plataforma }],
      },
      {
        name: "Agua",
        products: [
          { id: 10, name: "Sensor de Nivel", image: agricultura },
          { id: 11, name: "Pluviometro", image: hercules },
        ],
      },
    ],
  },
];

export const Botones = () => {
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
            <div className="inicio-sesion">
              <p className="inicio-sesion-text">
                Iniciar
                <br />
                Sesión
              </p>
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
          </div>
        </div>
      </nav>
    </div>
  );
};
