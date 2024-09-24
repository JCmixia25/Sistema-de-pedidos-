import React, { useEffect, useState } from "react";
import "./Carrito.css";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

const Carrito = ({ productos, setProductos }) => {
  const navigate = useNavigate(); // Inicializar useNavigate
  const notify = () => {
    toast.error("Necesitas Iniciar Sesion!", {
      position: "top-center",
    });
  };

  // useEffect(() => {
  //   console.log("nuevo producto: ", JSON.stringify(productos));
  //   // Cookies.remove("cart");
  //   Cookies.set("cart", JSON.stringify(productos));
  //   console.log("cookies: ", Cookies.get("cart"));
  // }, []);

  const aumentarCantidad = (id) => {
    const nuevosProductos = productos.map((prod) =>
      prod.id === id ? { ...prod, cantidad: prod.cantidad + 1 } : prod
    );
    setProductos(nuevosProductos);
  };

  const disminuirCantidad = (id) => {
    const nuevosProductos = productos.map((prod) =>
      prod.id === id && prod.cantidad > 1
        ? { ...prod, cantidad: prod.cantidad - 1 }
        : prod
    );
    setProductos(nuevosProductos);
  };

  const eliminarProducto = (id) => {
    const nuevosProductos = productos.filter((prod) => prod.id !== id);
    setProductos(nuevosProductos);
    Cookies.remove("cart");
    Cookies.set("cart", JSON.stringify(nuevosProductos));
  };

  const direccionar = () => {
    navigate("/productos"); // Redirigir a la página de productos
  };

  return (
    <div className="carrito-container">
      <h2>Mi Carrito</h2>
      {productos.map((producto) => (
        <div key={producto.id} className="producto">
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="producto-imagen"
          />
          <div className="producto-info">
            <h3>{producto.nombre}</h3>
            <p>Código: {producto.codigo}</p>
            <div className="cantidad-container">
              <button
                onClick={() => disminuirCantidad(producto.id)}
                className="btn-cantidad"
              >
                <FaMinus size={16} color="red" />
              </button>
              <span className="cantidad">{producto.cantidad}</span>
              <button
                onClick={() => aumentarCantidad(producto.id)}
                className="btn-cantidad"
              >
                <FaPlus size={16} color="green" />
              </button>
            </div>
          </div>
          <button
            onClick={() => eliminarProducto(producto.id)}
            className="btn-eliminar"
          >
            <FaTrash size={20} color="red" />
          </button>
        </div>
      ))}
      <div className="resumen-compra">
        <h3>Resumen de compra</h3>
        <button onClick={notify} className="btn-finalizar">
          Finalizar Pedido
        </button>
        <button onClick={direccionar} className="btn-continuar">
          Continuar Pedido
        </button>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Carrito;
