<<<<<<< HEAD
const Item = ({ producto }) => {
    return (
      <div className="item-container">
        <img alt="No se pudo mostrar la imagen" src={producto.imagen} />
        <div>
          <h4>{producto.titulo}</h4>
          <p>Precio: ${producto.precio}</p>
          <p>Categoría: {producto.categoria}</p>
          <p>{producto.descripcion}</p>
          <a href={`/item/${producto.id}`}>Ver más</a>
=======
import React from 'react'
import "./Item.css"

const Item = ( {producto}) => {
    return(
        <div className="item-producto">
            <img className="imagen-producto" alt="No se puedo mostrar la imagen " src={producto.imagen}/>
            <div>
                <h4>{producto.titulo}</h4>
                <p>Precio: ${producto.precio}</p>
                <p>Categoria: {producto.categoria}</p>
                <p>{producto.descripcion}</p>
                <a href={`/item/${producto.id}`}>Ver más</a>
            </div>
>>>>>>> df6fa8078b686725bcef05cc07617e177b6b3ae2
        </div>
      </div>
    );
  }
  
  export default Item;
  