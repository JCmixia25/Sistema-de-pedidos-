import React, { useState, useEffect } from "react";
import { db } from "../conexion/firebase";
import { collection, addDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate, useLocation } from "react-router-dom";

export function AddProduct() {
  const [product, setProduct] = useState({
    id: null,
    categoria: "",
    descripcion: "",
    imagen: null,
    precio: "",
    stock: "",
    titulo: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Obtener el producto a editar desde el estado de la navegación
  useEffect(() => {
    if (location.state && location.state.item) {
      setProduct(location.state.item);
    }
  }, [location.state]);

  const handleProductChange = ({ target: { name, value } }) => {
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Tomar el primer archivo
    setProduct({ ...product, imagen: file });
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = product.imagen;

      // Solo sube la imagen si hay un archivo nuevo
      if (typeof product.imagen === "object") {
        const storage = getStorage(); // Obtener la instancia de storage
        const storageRef = ref(storage, `imagenes/${product.imagen.name}`); // Crea una referencia al archivo
        await uploadBytes(storageRef, product.imagen); // Sube el archivo
        imageUrl = await getDownloadURL(storageRef); // Obtener la URL de descarga
      } else {
        // Si no hay una nueva imagen, usa la URL existente
        imageUrl = product.imagen;
      }

      // Actualizar o crear un nuevo producto en Firestore
      if (product.id) {
        // Actualizar un producto existente
        await updateDoc(doc(db, "productos", product.id), { ...product, imagen: imageUrl });
        setMessage("Producto actualizado exitosamente");
      } else {
        // Crear un nuevo producto
        const newProduct = await addDoc(collection(db, "productos"), { ...product, imagen: imageUrl });
        setProduct({ ...product, id: newProduct.id });
        setMessage("Producto agregado exitosamente");
      }

      navigate("/productos");
    } catch (error) {
      console.error("Error al guardar el producto: ", error);
      setMessage("Error al guardar el producto");
    }
  };

  return (
    <div className="add-product-container">
      <h2>{product.id ? "Editar Producto" : "Agregar Producto"}</h2>
      <form onSubmit={handleProductSubmit} className="product-form">
        <label>
          Categoría
          <select name="categoria" onChange={handleProductChange} value={product.categoria} required>
            <option value="">Selecciona una categoría</option>
            <option value="Eléctricos">ELECTRICO</option>
            <option value="Mecánicos">MECANICA</option>
            <option value="Electrónicos">ELECTRONICA</option>
            <option value="Aspersión">ASPERSIÓN</option>
            <option value="Hidráulicos">HIDRAULICA</option>
          </select>
        </label>
        <label>
          Descripción
          <input
            type="text"
            name="descripcion"
            onChange={handleProductChange}
            value={product.descripcion}
            placeholder="Descripción del producto"
            required
          />
        </label>
        <label>
          Título del Producto
          <input
            type="text"
            name="titulo"
            onChange={handleProductChange}
            value={product.titulo}
            placeholder="Título del producto"
            required
          />
        </label>
        <label>
          Precio
          <input
            type="number"
            name="precio"
            onChange={handleProductChange}
            value={product.precio}
            placeholder="Precio"
            required
          />
        </label>
        <label>
          Stock
          <input
            type="number"
            name="stock"
            onChange={handleProductChange}
            value={product.stock}
            placeholder="Cantidad en stock"
            required
          />
        </label>
        <label>
          Imagen del Producto
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </label>
        <button type="submit">{product.id ? "Actualizar Producto" : "Agregar Producto"}</button>
      </form>

      {/* Mostrar mensaje de estado */}
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default AddProduct;