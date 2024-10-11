import React, { useState, useEffect } from "react";
import "./FinalizarPedido.css"; // Archivo CSS para los estilos
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { PDFDownloadLink, pdf } from "@react-pdf/renderer";
import PdfDocument from "./pdf.jsx"; // Documento PDF
import { collection, addDoc } from "firebase/firestore";
import { db } from "../conexion/firebase.js";

const FinalizarPedido = () => {
  const location = useLocation();
  const [productos, setProductos] = useState(location.state?.productos || []); // Estado local para los productos

  const comprar = () => {
    const pedido = {
      cliente: product,  // Aquí pasamos el objeto con la información del cliente
      productos: productos,  // Asegúrate de que esté bien escrito, antes tenía "productor"
      total: total,
    };
  
    const pedidosRef = collection(db, "pedidos");
    
    addDoc(pedidosRef, pedido)
      .then(() => {
        console.log("Pedido guardado exitosamente");
      })
      .catch((error) => {
        console.error("Error al guardar el pedido: ", error);
      });
  };
 
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
  const [pedidoFinalizado, setPedidoFinalizado] = useState(false); // Controlar cuándo se finaliza el pedido
  const [urlDescarga, setUrlDescarga] = useState(null); // URL para descargar el PDF

  const departamentosCiudades = {
    Guatemala: ["Ciudad de Guatemala", "Mixco", "Villa Nueva"],
    Escuintla: ["Escuintla", "Santa Lucía Cotzumalguapa", "La Gomera"],
    // ... (otros departamentos)
  };

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
  
    if (pedidoFinalizado) return;
  
    if (isFormValid()) {
      notifylisto();
      setPedidoFinalizado(true);
      comprar();  // Llamamos a la función comprar después de la validación
      generatePdf();
    } else {
      notify();
    }
  };

  const notifylisto = () => {
    toast.success("Pedido enviado", {
      position: "top-center",
    });
  };

  const notify = () => {
    toast.error("Necesitas Completar la Informacion de envío", {
      position: "top-center",
    });
  };

  const total = productos.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0);

  const generatePdf = () => {
    const blob = pdf(<PdfDocument product={product} productos={productos} total={total} />).toBlob();
    blob.then((pdfBlob) => {
      const url = URL.createObjectURL(pdfBlob);
      setUrlDescarga(url);
    });
  };

  useEffect(() => {
    if (pedidoFinalizado && urlDescarga) {
      const link = document.createElement("a");
      link.href = urlDescarga;
      link.download = "comprobante.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(urlDescarga);

      // Limpiar productos y la información del cliente después de descargar el PDF
      setProductos([]); // Limpiar productos localmente en este componente
      setProduct({
        nombres: "",
        apellidos: "",
        departamento: "",
        ciudad: "",
        direccion: "",
        telefono: "",
        email: "",
        nit: "",
      }); // Limpiar los datos del cliente
    }
  }, [pedidoFinalizado, urlDescarga]);

  return (
    <div className="finalizar-pedido-container">
      <div className="form-container">
        <h2>Detalles de Envío</h2>
        <form onSubmit={handleProductSubmit} className="product-form">
          <label>
            Nombres
            <input type="text" name="nombres" onChange={handleProductChange} value={product.nombres} />
          </label>
          <label>
            Apellidos
            <input type="text" name="apellidos" onChange={handleProductChange} value={product.apellidos} />
          </label>
          <label>
            Departamento
            <select name="departamento" onChange={handleProductChange} value={product.departamento}>
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
            <select name="ciudad" onChange={handleProductChange} value={product.ciudad}>
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
          <button type="submit" className="btn-finalizar" disabled={pedidoFinalizado}>
            {pedidoFinalizado ? "Pedido Finalizado" : "FINALIZAR PEDIDO"}
          </button>
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
                <p>nombre: {producto.titulo}</p>
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
    </div>
  );
};  

export default FinalizarPedido;
