import React from "react";
import "./Item.css";
import { Link, NavLink } from "react-router-dom";


const Item = ({ producto }) => {
  return (
    <div className="container-datos-productos">
      <img
        className="imagen-producto"
        alt="No se puedo mostrar la imagen "
        src={producto.imagen}
      />
      <div>
        <h4>{producto.titulo}</h4>
        <p className="informacion-producto">Precio: Q. {producto.precio}</p>
        <p className="informacion-producto">Categoria: {producto.categoria}</p>
        <p className="informacion-producto">{producto.descripcion}</p>
        <NavLink className="informacion-producto" to={`/item/${producto.id}`}>
          Ver más   
        </NavLink>
      </div>
    </div>
  );
};



export default Item;
