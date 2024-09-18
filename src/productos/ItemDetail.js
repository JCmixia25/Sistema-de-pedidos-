import React, { useContext } from 'react'
import ItemCount from "../productos/ItemCount"
import { useState } from 'react';
import { CartContext } from '../context/CartContext';

const ItemDetail = ({item}) => {

  const [cantidad, setCantidad] = (useState(1));

  const user = useContext(CartContext).user;
  console.log(user);

  const handleRestar = () => {
      cantidad > 1 && setCantidad(cantidad - 1)
  }

  const handleSumar = () => {
      cantidad < item.stock && setCantidad(cantidad + 1)
  }

  const handleAgregar = () => {
    console.log(...item, cantidad)
  }

  return (
    <div>
        <img src={item.imagen} alt={item.titulo}/>
        <div>
            <h3>{item.titulo}</h3>
            <p>{item.descripcion}</p>
            <p>Categoria: {item.categoria}</p>
            <p>Q{item.precio}</p>
            <ItemCount cantidad={cantidad} handleSumar={handleSumar}  handleRestar={handleRestar} handleAgregar={handleAgregar}/>
        </div>
    </div>
  )
}

export default ItemDetail