import React, { useState, useEffect } from "react";
import "./FinalizarPedido.css";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { pdf } from "@react-pdf/renderer";
import PdfDocument from "./pdf.jsx";
import { collection, addDoc, doc, writeBatch } from "firebase/firestore";
import { db, storage } from "../conexion/firebase.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const FinalizarPedido = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [productos, setProductos] = useState(location.state?.productos || []);
  const [pedidoFinalizado, setPedidoFinalizado] = useState(false);
  const [urlDescarga, setUrlDescarga] = useState(null);
  const [pdfGenerado, setPdfGenerado] = useState(false);
 

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

 

  const [municipio, setmunicipio] = useState([]);

  const departamentosmunicipio = {
    Guatemala: ['Mixco', 'Villa Nueva', 'Guatemala Ciudad', 'Villa Canales', 'San José Pinula', 'Amatitlán', 'Santa Catarina Pinula', 'Palencia', 'San Pedro Ayampuc', 'San Juan Sacatepéquez', 'San Miguel Petapa', 'Chinautla', 'Fraijanes', 'San Raymundo'],
    Escuintla: ['Escuintla', 'La Gomera', 'Santa Lucía Cotzumalguapa', 'Puerto San José', 'Palín', 'Iztapa', 'Tiquisate', 'Nueva Concepción', 'Siquinalá', 'Masagua', 'San Vicente Pacaya', 'Guanagazapa'],
    "Baja Verapaz": ['Salamá', 'Purulhá', 'San Jerónimo', 'San Miguel Chicaj', 'Cubulco', 'Rabinal', 'Granados', 'El Chol'],
    "Alta Verapaz": ['Cobán', 'San Pedro Carchá', 'Chisec', 'San Cristóbal Verapaz', 'Tucurú', 'Santa Cruz Verapaz', 'Tactic', 'Fray Bartolomé de las Casas', 'Raxruhá', 'Senahú', 'Panzós', 'Cahabón', 'Santa María Cahabón', 'Chahal', 'Santa Catalina La Tinta', 'Tamahú', 'San Juan Chamelco'],
    Zacapa: ['Zacapa', 'Teculután', 'Río Hondo', 'Gualán', 'La Unión', 'Huité', 'Usumatlán', 'Cabañas', 'San Jorge'],
    Chimaltenango: ['Chimaltenango', 'San Juan Comalapa', 'San Martín Jilotepeque', 'San José Poaquil', 'Santa Apolonia', 'Tecpán Guatemala', 'Patzún', 'Pochuta', 'Patzicía', 'Santa Cruz Balanyá', 'Acatenango', 'Yepocapa', 'El Tejar', 'Parramos'],
    Chiquimula: ['Chiquimula', 'Esquipulas', 'Concepción Las Minas', 'Quezaltepeque', 'San Jacinto', 'San José La Arada', 'Ipala', 'Olopa', 'Camotán', 'Jocotán'],
    "El Progreso": ['Guastatoya', 'Morazán', 'Sanarate', 'Sansare', 'El Jícaro', 'San Antonio La Paz', 'San Agustín Acasaguastlán', 'San Cristóbal Acasaguastlán'],
    Huehuetenango: ['Huehuetenango', 'Santa Ana Huista', 'San Antonio Huista', 'San Sebastián Coatán', 'Todos Santos Cuchumatán', 'San Pedro Soloma', 'La Democracia', 'La Libertad', 'Colotenango', 'San Ildefonso Ixtahuacán', 'Santa Cruz Barillas', 'Santa Eulalia', 'San Rafael La Independencia', 'San Miguel Acatán', 'San Juan Atitán', 'San Sebastián Huehuetenango', 'Santiago Chimaltenango', 'San Mateo Ixtatán', 'San Gaspar Ixchil', 'Nentón', 'Jacaltenango', 'Cuilco', 'Chiantla', 'Malacatancito', 'San Juan Ixcoy'],
    Izabal: ['Puerto Barrios', 'Livingston', 'El Estor', 'Morales', 'Los Amates'],
    Jalapa: ['Jalapa', 'San Pedro Pinula', 'San Luis Jilotepeque', 'San Manuel Chaparrón', 'San Carlos Alzatate', 'Monjas', 'Mataquescuintla'],
    Jutiapa: ['Jutiapa', 'El Progreso', 'Santa Catarina Mita', 'Agua Blanca', 'Asunción Mita', 'Yupiltepeque', 'Atescatempa', 'Jalpatagua', 'Comapa', 'Jerez', 'Conguaco', 'Moyuta', 'Pasaco', 'Quesada', 'San José Acatempa', 'Zapotitlán'],
    Petén: ['Flores', 'San Benito', 'San Andrés', 'San José', 'Melchor de Mencos', 'Poptún', 'Santa Ana', 'San Luis', 'Sayaxché', 'Las Cruces', 'La Libertad', 'El Chal', 'Dolores'],
    Quetzaltenango: ['Quetzaltenango', 'Salcajá', 'Olintepeque', 'San Carlos Sija', 'Sibilia', 'Cabricán', 'Cajolá', 'San Miguel Sigüilá', 'San Juan Ostuncalco', 'Concepción Chiquirichapa', 'San Martín Sacatepéquez', 'Almolonga', 'Cantel', 'Zunil', 'Colomba', 'El Palmar', 'Coatepeque', 'Flores Costa Cuca', 'Génova', 'Huitán', 'San Francisco La Unión'],
    Quiché: ['Santa Cruz del Quiché', 'Joyabaj', 'Zacualpa', 'Chiché', 'Chinique', 'San Andrés Sajcabajá', 'San Bartolomé Jocotenango', 'Canillá', 'Chajul', 'Nebaj', 'Sacapulas', 'San Pedro Jocopilas', 'Uspantán', 'Pachalum', 'Chicamán', 'Cunén', 'San Juan Cotzal'],
    Retalhuleu: ['Retalhuleu', 'Champerico', 'San Martín Zapotitlán', 'San Felipe Retalhuleu', 'San Andrés Villa Seca', 'Santa Cruz Muluá', 'Nuevo San Carlos', 'El Asintal'],
    Sacatepéquez: ['Antigua Guatemala', 'Ciudad Vieja', 'Jocotenango', 'Pastores', 'Sumpango', 'Santo Domingo Xenacoj', 'Santiago Sacatepéquez', 'San Lucas Sacatepéquez', 'San Bartolomé Milpas Altas', 'San Antonio Aguas Calientes', 'Santa Catarina Barahona', 'Santa Lucía Milpas Altas', 'Magdalena Milpas Altas', 'San Juan Alotenango'],
    "San Marcos": ['San Marcos', 'Ayutla (Tecún Umán)', 'Catarina', 'Comitancillo', 'Concepción Tutuapa', 'El Quetzal', 'El Tumbador', 'Ixchiguán', 'La Reforma', 'Malacatán', 'Nuevo Progreso', 'Ocós', 'Pajapita', 'Río Blanco', 'San Antonio Sacatepéquez', 'San Cristóbal Cucho', 'San José Ojetenam', 'San Lorenzo', 'San Miguel Ixtahuacán', 'San Pablo', 'San Pedro Sacatepéquez', 'Sibinal', 'Sipacapa', 'Tacaná', 'Tajumulco', 'Tejutla'],
    "Santa Rosa": ['Cuilapa', 'Barberena', 'Chiquimulilla', 'Guazacapán', 'Nueva Santa Rosa', 'Oratorio', 'Pueblo Nuevo Viñas', 'San Juan Tecuaco', 'Santa Cruz Naranjo', 'Santa María Ixhuatán', 'Taxisco', 'Casillas', 'Santa Rosa de Lima', 'San Rafael Las Flores'],
    Sololá: ['Sololá', 'San José Chacayá', 'Santa María Visitación', 'Santa Lucía Utatlán', 'Nahualá', 'Panajachel', 'San Andrés Semetabaj', 'San Antonio Palopó', 'San Juan La Laguna', 'San Lucas Tolimán', 'San Marcos La Laguna', 'Santa Catarina Palopó', 'Santa Clara La Laguna', 'Santa Cruz La Laguna', 'Santa Lucía Utatlán', 'Santiago Atitlán'],
    Suchitepéquez: ['Mazatenango', 'San Francisco Zapotitlán', 'San Bernardino', 'San José El Ídolo', 'Santo Domingo Suchitepéquez', 'Patulul', 'Santa Bárbara', 'San Juan Bautista', 'San Lorenzo', 'San Miguel Panán', 'Samayac', 'Chicacao', 'Zunilito', 'Cuyotenango', 'Pueblo Nuevo', 'Río Bravo', 'Santo Tomás La Unión'],
    Totonicapán: ['Totonicapán', 'San Cristóbal Totonicapán', 'San Francisco El Alto', 'San Andrés Xecul', 'Momostenango', 'Santa Lucía La Reforma', 'Santa María Chiquimula', 'San Bartolo Aguas Calientes']
    
    };

  const handleProductChange = ({ target: { name, value } }) => {
    setProduct({ ...product, [name]: value });

    if (name === "departamento") {
      setmunicipio(departamentosmunicipio[value] || []);
      setProduct((prevProduct) => ({
        ...prevProduct,
        municipio: "",
      }));
    }
  };

  const isFormValid = () => {
    return (
      product.nombres.trim() !== "" &&
      product.apellidos.trim() !== "" &&
      product.departamento.trim() !== "" &&
      product.municipio.trim() !== "" &&
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

  const formatCurrency = (amount) => {
    const numAmount = parseFloat(amount); // Convertir a número
    if (!isNaN(numAmount)) {
      const formattedAmount = numAmount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return formattedAmount;
    } else {
      return amount; // Retornar el valor original si no es un número
    }
  };

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

  const actualizarStockProductos = async () => {
    const batch = writeBatch(db); // Crear un batch para actualizaciones en lote

    productos.forEach((producto) => {
      const productRef = doc(db, "productos", producto.id); // Referencia del producto en Firestore
      const nuevoStock = producto.stock - producto.cantidad; // Calcular nuevo stock

      if (nuevoStock >= 0) { // Solo actualizar si el stock no será negativo
        batch.update(productRef, { stock: nuevoStock });
      } else {
        console.error(`Stock insuficiente para el producto: ${producto.titulo}`);
      }
    });

    try {
      await batch.commit(); // Ejecutar el batch para actualizar todos los productos
      console.log("Stock actualizado correctamente");
    } catch (error) {
      console.error("Error al actualizar el stock: ", error);
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
      actualizarStockProductos(); // Actualizar el stock después de generar el pedido
    }
  }, [pedidoFinalizado, urlDescarga]);

  return (
    <div className="finalizar-pedido-container">
      <div className="form-container">
        <h2>Detalles de Envío</h2>
        <form onSubmit={handleProductSubmit} className="product-form">
          <label>
            Nombres
            <input type="text" name="nombres" onChange={handleProductChange} value={product.nombres} required />
          </label>
          <label>
            Apellidos
            <input type="text" name="apellidos" onChange={handleProductChange} value={product.apellidos} required />
          </label>
          <label>
            Departamento
            <select name="departamento" onChange={handleProductChange} value={product.departamento} required>
              <option value="">Seleccione un departamento</option>
              {Object.keys(departamentosmunicipio).map((departamento) => (
                <option key={departamento} value={departamento}>
                  {departamento}
                </option>
              ))}
            </select>
          </label>
          <label>
            Municipio
            <select name="municipio" onChange={handleProductChange} value={product.municipio} required>
              <option value="">Seleccione un municipio</option>
              {municipio.map((muni) => (
                <option key={muni} value={muni}>
                  {muni}
                </option>
              ))}
            </select>
          </label>
          <label>
            Dirección de envío
            <input type="text" name="direccion" onChange={handleProductChange} value={product.direccion} required />
          </label>
          <label>
            Teléfono
            <input type="tel" name="telefono" onChange={handleProductChange} value={product.telefono} required />
          </label>
          <label>
            Correo Electrónico
            <input type="email" name="email" onChange={handleProductChange} value={product.email} required />
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
                <p>Precio: Q{formatCurrency(producto.precio)}</p>
                <p>Total: Q{formatCurrency(producto.cantidad * producto.precio)}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No hay productos en el carrito</p>
        )}
        <div className="resumen-total">
          <h3>Total: Q{formatCurrency(total)}</h3>
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