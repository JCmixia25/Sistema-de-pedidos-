import React, { useState } from "react";
import "./FinalizarPedido.css"; // Archivo CSS para los estilos
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

// Objeto con departamentos y sus respectivas ciudades
const departamentosCiudades = {
  Guatemala: ["Ciudad de Guatemala", "Mixco", "Villa Nueva"],
  Escuintla: ["Escuintla", "Santa Lucía Cotzumalguapa", "La Gomera"],
  Zacapa: ["Zacapa", "Teculután", "Gualán"],
  Chiquimula: ["Chiquimula", "Esquipulas", "San José La Arada"],
  Chimaltenango: ["Chimaltenango", "Comalapa", "El Tejar"],
  Suchitepéques: ["Mazatenango", "San Antonio Suchitepéquez", "Patulul"],
  AltaVerapaz: ["Cobán", "San Pedro Carchá", "Tactic"],
  BajaVerapaz: ["Salamá", "Cubulco", "Purulhá"],
  ElProgreso: ["Guastatoya", "Sanarate", "Sansare"],
  Huehuetenango: ["Huehuetenango", "Chiantla", "La Democracia"],
  Izabal: ["Puerto Barrios", "Morales", "Livingston"],
  Jalapa: ["Jalapa", "San Pedro Pinula", "Monjas"],
  Jutiapa: ["Jutiapa", "El Progreso", "Jalpatagua"],
  Petén: ["Flores", "San Benito", "Santa Elena"],
  Quetzaltenango: ["Quetzaltenango", "Coatepeque", "Olintepeque"],
  Quiché: ["Santa Cruz del Quiché", "Chichicastenango", "Joyabaj"],
  Sololá: ["Sololá", "Panajachel", "San Lucas Tolimán"],
  Retalhuleu: ["Retalhuleu", "Champerico", "San Sebastián"],
};

const FinalizarPedido = () => {
  const location = useLocation();
  const productos = location.state?.productos || [];

  const [product, setProduct] = useState({
    nombres: "",
    apellidos: "",
    departamento: "",
    ciudad: "",
    direccion: "",
    telefono: "",
    email: "",
    nit: "",
  });

  const [ciudades, setCiudades] = useState([]); 
  const navigate = useNavigate();

  const handleProductChange = ({ target: { name, value } }) => {
    setProduct({ ...product, [name]: value });

    if (name === "departamento") {
      setCiudades(departamentosCiudades[value] || []);
      setProduct((prevProduct) => ({
        ...prevProduct,
        ciudad: "", 
      }));
    }
  };

  const isFormValid = () => {
    return (
      product.nombres.trim() !== "" &&
      product.apellidos.trim() !== "" &&
      product.departamento.trim() !== "" &&
      product.ciudad.trim() !== "" &&
      product.direccion.trim() !== "" &&
      product.telefono.trim() !== "" &&
      product.email.trim() !== ""
    );
  };

  const handleProductSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      navigate("/confirmacion");
    } else {
      notify(); 
    }
  };

   const notify = () => {
    toast.error("Necesitas Completar la Informacion de envío", {
      position: "top-center",
    });
  };

  const total = productos.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0);

  return (
    <div className="finalizar-pedido-container">
      <div className="form-container">
        <h2>Detalles de Envío</h2>
        <form onSubmit={handleProductSubmit} className="product-form">
          <label>
            Nombres
            <input type="text" name="nombres" onChange={handleProductChange} value={product.nombres}  />
          </label>
          <label>
            Apellidos
            <input type="text" name="apellidos" onChange={handleProductChange} value={product.apellidos} />
          </label>
          <label>
            Departamento
            <select name="departamento" onChange={handleProductChange} value={product.departamento} >
              <option value="">Seleccione un departamento</option>
              {Object.keys(departamentosCiudades).map((departamento) => (
                <option key={departamento} value={departamento}>
                  {departamento}
                </option>
              ))}
            </select>
          </label>
          <label>
            Ciudad
            <select name="ciudad" onChange={handleProductChange} value={product.ciudad} >
              <option value="">Seleccione una ciudad</option>
              {ciudades.map((ciudad) => (
                <option key={ciudad} value={ciudad}>
                  {ciudad}
                </option>
              ))}
            </select>
          </label>
          <label>
            Dirección de envío
            <input type="text" name="direccion" onChange={handleProductChange} value={product.direccion} />
          </label>
          <label>
            Teléfono
            <input type="number" name="telefono" onChange={handleProductChange} value={product.telefono} />
          </label>
          <label>
            Correo Electrónico
            <input type="email" name="email" onChange={handleProductChange} value={product.email} />
          </label>
          <label>
            NIT (Opcional)
            <input type="text" name="nit" onChange={handleProductChange} value={product.nit} />
          </label>
          <button type="submit" className="btn-finalizar">FINALIZAR PEDIDO</button>
        </form>
        <ToastContainer />

      </div>

      <div className="resumen-container">
        <h2>Resumen del Carrito</h2>
        {productos.length > 0 ? (
          productos.map((producto) => (
            <div key={producto.id} className="resumen-producto">
              <img src={producto.imagen} alt={producto.nombre} className="resumen-producto-imagen" />
              <div className="resumen-producto-info">
                <p>{producto.nombre}</p>
                <p>Cantidad: {producto.cantidad}</p>
                <p>Precio: Q{producto.precio}</p>
                <p>Total: Q{producto.cantidad * producto.precio}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No hay productos en el carrito</p>
        )}
        <div className="resumen-total">
          <h3>Total: Q{total}</h3>
        </div>
      </div>

      {/* Toast container to display notifications */}
     
    </div>
  );
};

export default FinalizarPedido;
