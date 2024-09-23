import React from "react";
import "./Item.css";
import { NavLink, useNavigate } from "react-router-dom";

const Item = ({ producto, onAddToCart}) => {
  const navigate = useNavigate(); // Inicializar useNavigate

  const detalle = () => {
    navigate(`/item/${producto.id}`); // Redirigir a la página de productos
  };

  const agregar = () => {
    onAddToCart(producto);
    navigate("/carrito");
  }
  return (
    <div className="container-datos-productos">
      <div className="container-imagen">
        <img
          className="imagen-producto"
          alt="No se puedo mostrar la imagen "
          src={producto.imagen}
        />
      </div>
      <div className="info-container">
        <div className="contenedor-titulo">
          <h4>{producto.titulo}</h4>
        </div>
        {/* <div className="contenedor-precio">
          <p className="informacion-producto">Precio: Q. {producto.precio}</p>
        </div> */}
        {/* <div className="contenedor-cat">
          <p className="informacion-producto">
            Categoria: {producto.categoria}
          </p>
        </div> */}
        {/* <div className="contenedor-desc">
            <p className="informacion-producto">{producto.descripcion}</p>

        </div> */}

        {/* <NavLink className="informacion-producto" to={`/item/${producto.id}`}>
              Ver más
            </NavLink> */}
                <div>
          <button onClick={detalle} className="informacion-ver">
            Ver más
          </button>
        </div>
        <div>
          <button onClick={agregar} className="informacion-ver">
            Agregar a carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default Item;
