import React, { useState, useEffect } from "react";
import "./FinalizarPedido.css";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { pdf } from "@react-pdf/renderer";
import PdfDocument from "./pdf.jsx";
import { collection, addDoc } from "firebase/firestore";
import { db, storage } from "../conexion/firebase.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";

const FinalizarPedido = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [productos, setProductos] = useState(location.state?.productos || []);
  const [pedidoFinalizado, setPedidoFinalizado] = useState(false);
  const [urlDescarga, setUrlDescarga] = useState(null);
  const [pdfGenerado, setPdfGenerado] = useState(false);
  const datoscuenta = localStorage.getItem("cuenta");

  const [product, setProduct] = useState({
    nombres: "",
    apellidos: "",
    departamento: "",
    municipio: "",
    direccion: "",
    telefono: "",
    email: "",
    nit: "",
  });

  useEffect(() => {
    let datos = JSON.parse(datoscuenta);
    if (datos) {
      setProduct({
        nombres: datos.nombre || "",
        apellidos: datos.apellido || "",
        departamento: datos.departamento || "",
        ciudad: datos.municipio || "",
        direccion: datos.direccion || "",
        telefono: datos.telefono || "",
        email: datos.email || "",
        nit: datos.nit || "",
      });
    }
  }, [datoscuenta]);

  const [ciudades, setCiudades] = useState([]);

  const departamentosCiudades = {
    Guatemala: ["Ciudad de Guatemala", "Mixco", "Villa Nueva"],
    Escuintla: ["Escuintla", "Santa Lucía Cotzumalguapa", "La Gomera"],
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

  const notifylisto = () => {
    toast.success("Pedido enviado", {
      position: "top-center",
    });
  };

  const notify = () => {
    toast.error("Necesitas Completar la Información de envío", {
      position: "top-center",
    });
  };

  const total = productos.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0);

  const comprar = async () => {
    if (!urlDescarga) {
      console.error("URL del PDF no está disponible");
      return;
    }

    const pedido = {
      cliente: product,
      productos: productos,
      total: total,
      fecha: new Date().toLocaleString(),
      estado: "Pendiente",
      pdfUrl: urlDescarga,
    };

    try {
      const pedidosRef = collection(db, "pedidos");
      await addDoc(pedidosRef, pedido);
      console.log("Pedido guardado exitosamente");
    } catch (error) {
      console.error("Error al guardar el pedido: ", error);
    }
  };

  const generatePdf = async () => {
    try {
      const blob = await pdf(<PdfDocument product={product} productos={productos} total={total} />).toBlob();
      const storageRef = ref(storage, `pdfs/pedido_${new Date().getTime()}.pdf`);

      const snapshot = await uploadBytes(storageRef, blob);
      const downloadUrl = await getDownloadURL(snapshot.ref);

      setUrlDescarga(downloadUrl);
      setPdfGenerado(true);
    } catch (error) {
      console.error("Error al subir el PDF: ", error);
    }
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();

    if (pedidoFinalizado) return;

    if (isFormValid()) {
      notifylisto();
      setPedidoFinalizado(true);
      await generatePdf();
    } else {
      notify();
    }
  };

  const downloadPdf = () => {
    window.open(urlDescarga, "_blank");
    navigate("/");
  };

  useEffect(() => {
    if (pedidoFinalizado && urlDescarga) {
      comprar();
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
            <select name="municipio" onChange={handleProductChange} value={product.municipio}>
              <option value="">Seleccione un municipio</option>
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
                <p>Nombre: {producto.titulo}</p>
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
        {pdfGenerado && (
          <button className="btn-descargar" onClick={downloadPdf}>
            Descargar PDF
          </button>
        )}
      </div>
    </div>
  );
};

export default FinalizarPedido;
