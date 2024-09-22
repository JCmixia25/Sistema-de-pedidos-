import React from "react";
import "./Item.css";
import { Link, NavLink } from "react-router-dom";

const Item = ({ producto }) => {
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
        <div className="contenedor-precio">
          <p className="informacion-producto">Precio: Q. {producto.precio}</p>
        </div>
        <div className="contenedor-cat">
          <p className="informacion-producto">
            Categoria: {producto.categoria}
          </p>
        </div>
        <div className="contenedor-desc">
            <p className="informacion-producto">{producto.descripcion}</p>

        </div>
        <div className="informacion-ver">
          <NavLink className="informacion-producto" to={`/item/${producto.id}`}>
            Ver más
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Item;
