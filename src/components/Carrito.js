import React, { useEffect } from "react";
import "./Carrito.css";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { useAuth } from "../context/authContext";

const Carrito = ({ productos, setProductos, setBlinking }) => {
  const navigate = useNavigate();
  const { estado } = useAuth();

  const notify = () => {
    toast.error("Necesitas Iniciar Sesión!", {
      position: "top-center",
    });
  };

  // Cargar productos desde las cookies al iniciar el componente
  useEffect(() => {
    const storedProducts = Cookies.get("cart");
    if (storedProducts) {
      setProductos(JSON.parse(storedProducts));
    }
  }, [setProductos]);

  // Guardar productos en cookies cada vez que cambien
  useEffect(() => {
    if (productos.length > 0) {
      Cookies.set("cart", JSON.stringify(productos));
    } else {
      Cookies.remove("cart"); // Eliminar la cookie si no hay productos
    }
  }, [productos]);

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
  };

  const direccionar = () => {
    navigate("/productos");
  };

  const handleFinalizarPedido = () => {
    if (estado) {
      navigate("/finalizarpedido", { state: { productos } });
    } else {
      notify();
      setBlinking(true);
      setTimeout(() => setBlinking(false), 2000);
    }
  };

  return (
    <div className="carrito-container">
      <h2>Mi Carrito</h2>
      {productos.length === 0 ? (
        <p>NO HAY PRODUCTOS AÑADIDOS EN EL CARRITO</p>
      ) : (
        productos.map((producto) => (
          <div key={producto.id} className="producto">
            <img src={producto.imagen} alt={producto.nombre} className="producto-imagen" />
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
        ))
      )}
      <div className="resumen-compra">
        <h3>Resumen de compra</h3>
        <button onClick={handleFinalizarPedido} className="btn-finalizar">
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