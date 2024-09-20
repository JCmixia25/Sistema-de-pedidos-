import React, { useState } from 'react';
import './Carrito.css';

import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';

const productosIniciales = [
 
];

const Carrito = ({productos, setProductos}) => {
  {/*const [productos, setProductos] = useState(productosIniciales);*/}

  const aumentarCantidad = (id) => {
    const nuevosProductos = productos.map(prod => 
      prod.id === id ? { ...prod, cantidad: prod.cantidad + 1 } : prod
    );
    setProductos(nuevosProductos);
  };

  const disminuirCantidad = (id) => {
    const nuevosProductos = productos.map(prod => 
      prod.id === id && prod.cantidad > 1 ? { ...prod, cantidad: prod.cantidad - 1 } : prod
    );
    setProductos(nuevosProductos);
  };

  const eliminarProducto = (id) => {
    const nuevosProductos = productos.filter(prod => prod.id !== id);
    setProductos(nuevosProductos);
  };

  return (
    <div className="carrito-container">
      <h2>Mi Carrito</h2>
      {productos.map(producto => (
        <div key={producto.id} className="producto">
          <img src={producto.imagen} alt={producto.nombre} className="producto-imagen" />
          <div className="producto-info">
            <h3>{producto.nombre}</h3>
            <p>Código: {producto.codigo}</p>
            <div className="cantidad-container">
              <button onClick={() => disminuirCantidad(producto.id)} className="btn-cantidad">
                <FaMinus size={16} color="red" />
              </button>
              <span className="cantidad">{producto.cantidad}</span>
              <button onClick={() => aumentarCantidad(producto.id)} className="btn-cantidad">
                <FaPlus size={16} color="green" />
              </button>
            </div>
          </div>
          <button onClick={() => eliminarProducto(producto.id)} className="btn-eliminar">
            <FaTrash size={20} color="red" />
          </button>
        </div>
      ))}
      <div className="resumen-compra">
        <h3>Resumen de compra</h3>
        <button className="btn-finalizar">Finalizar Pedido</button>
        <button  className="btn-continuar">Continuar comprando</button>
      </div>
    </div>
  );
};

export default Carrito;