import React, { useState } from "react";
import "./FinalizarPedido.css"; // Archivo CSS para los estilos
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

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

  // Estado para manejar los detalles del producto/cliente
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

  const [ciudades, setCiudades] = useState([]); // Estado para las ciudades dinámicas
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleProductChange = ({ target: { name, value } }) => {
    setProduct({ ...product, [name]: value });

    // Si el campo cambiado es el departamento, actualizamos las ciudades
    if (name === "departamento") {
      setCiudades(departamentosCiudades[value] || []); // Set ciudades según el departamento seleccionado
      setProduct((prevProduct) => ({
        ...prevProduct,
        ciudad: "", // Limpiar la ciudad seleccionada cuando cambie el departamento
      }));
    }
  };

  const handleProductSubmit = (e) => {
    e.preventDefault();
    setMessage("Pedido finalizado exitosamente");
    navigate("/confirmacion");
  };

  const total = productos.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0);

  return (
    <div className="finalizar-pedido-container">
      <div className="form-container">
        <h2>Detalles de Envío</h2>
        <form onSubmit={handleProductSubmit} className="product-form">
          <label>
            Nombres
            <input type="text" name="nombres" onChange={handleProductChange} required />
          </label>
          <label>
            Apellidos
            <input type="text" name="apellidos" onChange={handleProductChange} required />
          </label>
          <label>
            Departamento
            <select name="departamento" onChange={handleProductChange} required>
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
            <select name="ciudad" onChange={handleProductChange} value={product.ciudad} required>
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
            <input type="text" name="direccion" onChange={handleProductChange} required />
          </label>
          <label>
            Teléfono
            <input type="number" name="telefono" onChange={handleProductChange} required />
          </label>
          <label>
            Correo Electrónico
            <input type="email" name="email" onChange={handleProductChange} required />
          </label>
          <label>
            NIT (Opcional)
            <input type="text" name="nit" onChange={handleProductChange} />
          </label>
          <button type="submit" className="btn-finalizar">
            Finalizar Pedido
          </button>
        </form>
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
        <button className="btn-finalizar">Confirmar</button>
      </div>
    </div>
  );
};

export default FinalizarPedido;
