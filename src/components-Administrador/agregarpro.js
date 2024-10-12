import React, { useState } from "react";
import { db } from "../conexion/firebase"; 
import { collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"; 
import { useNavigate } from "react-router-dom";

export function AddProduct() {
  const [product, setProduct] = useState({
    categoria: "",
    descripcion: "",
    imagen: null,
    precio: "",
    stock: "",
    titulo: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

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
      const storage = getStorage(); // Obténer la instancia de storage
      const storageRef = ref(storage, `imagenes/${product.imagen.name}`); // Crea una referencia al archivo
      await uploadBytes(storageRef, product.imagen); // Sube el archivo
      const imageUrl = await getDownloadURL(storageRef); // Obténer la URL de descarga

      // Guardar datos del producto en Firestore
      await addDoc(collection(db, "productos"), { ...product, imagen: imageUrl });

      setMessage("Producto agregado exitosamente");
      navigate("/productos");
    } catch (error) {
      console.error("Error al agregar el producto: ", error);
      setMessage("Error al agregar el producto");
    }
  };

  return (
    <div className="add-product-container">
      <h2>Agregar Producto</h2>
      <form onSubmit={handleProductSubmit} className="product-form">
        <label>
          Categoría
          <select name="categoria" onChange={handleProductChange} required>
            <option value="">Selecciona una categoría</option>
            <option value="Electrónica">Electrónica</option>
            <option value="Abono">Abono</option>
            <option value="Herbicidas">Herbicidas</option>
            <option value="Sensores">Sensores</option>
            <option value="Pantallas">Pantallas</option>
          </select>
        </label>
        <label>
          Descripción
          <input
            type="text"
            name="descripcion"
            onChange={handleProductChange}
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
            required
          />
        </label>
        <button type="submit">Agregar Producto</button>
      </form>

      {/* Mostrar mensaje de estado */}
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default AddProduct;