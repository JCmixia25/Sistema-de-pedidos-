import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../context/authContext"; 
import "./Item.css";

const Item = ({ producto, onAddToCart }) => {
  const navigate = useNavigate(); // Inicializar useNavigate
  const { datosUsuario } = useContext(authContext); // Obtener datos de usuario desde el contexto

  const detalle = () => {
    navigate(`/item/${producto.id}`); // Redirigir a la página de productos
  };

  const agregar = () => {
    onAddToCart(producto); // Agregar producto al carrito
    navigate("/carrito"); // Redirigir al carrito
  };

  // Verificar si el usuario es Administrador
  const esAdministrador = datosUsuario && datosUsuario.length > 0 && datosUsuario[0]?.rol === "Administrador";

  // Mostrar el botón solo si no es administrador
  const mostrarBotonAgregar = !esAdministrador; // Muestra el botón si no es administrador

  return (
    <div className="container-datos-productos">
      <div className="container-imagen">
        <img
          className="imagen-producto"
          alt="No se pudo mostrar la imagen"
          src={producto.imagen}
        />
      </div>
      <div className="info-container">
        <div className="contenedor-titulo">
          <h4>{producto.titulo}</h4>
        </div>
        <div>
          <button onClick={detalle} className="informacion-ver">
            Ver más
          </button>
        </div>
        {/* Mostrar el botón solo si no es administrador */}
        {mostrarBotonAgregar && (
          <div>
            <button onClick={agregar} className="informacion-ver">
              Agregar a carrito
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Item;