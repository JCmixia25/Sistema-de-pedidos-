import React, { useState } from "react";
import "./agregarpro.css"; // Archivo CSS para los estilos
import { useNavigate } from "react-router-dom";

export function AddProduct() {
  const [product, setProduct] = useState({
    codigo: "",
    name: "",
    category: "",
    warehouse: "",
    description: "",
    price: "",
    stock: "",
  });
  const [images, setImages] = useState({ image1: null, image2: null, image3: null });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleProductChange = ({ target: { name, value } }) => {
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    setImages({ ...images, [e.target.name]: e.target.files[0] });
  };

  const handleProductSubmit = (e) => {
    e.preventDefault();
    console.log("Producto agregado:", product);
    setMessage("Producto agregado exitosamente");
    navigate("/productos");
  };

  const handleImageSubmit = (e) => {
    e.preventDefault();
    if (images.image1 && images.image2 && images.image3) {
      console.log("Imagen 1 subida:", images.image1);
      console.log("Imagen 2 subida:", images.image2);
      console.log("Imagen 3 subida:", images.image3);
      setMessage("Imágenes subidas exitosamente");
    } else {
      setMessage("Por favor, selecciona tres imágenes.");
    }
  };

  return (
    <div className="add-product-container">
      <h2>Agregar Producto</h2>

      {/* Formulario para agregar producto */}
      <form onSubmit={handleProductSubmit} className="product-form">
        <label>
          Código del Producto
          <input
            type="text"
            name="codigo"
            onChange={handleProductChange}
            placeholder="Código del producto"
            required
          />
        </label>
        <label>
          Nombre del Producto
          <input
            type="text"
            name="name"
            onChange={handleProductChange}
            placeholder="Nombre del producto"
            required
          />
        </label>

        {/* Campo de selección para categoría */}
        <label>
          Categoría
          <select name="category" onChange={handleProductChange} required>
            <option value="">Selecciona una categoría</option>
            <option value="Electrónica">Electrónica</option>
            <option value="Abono">Abono</option>
            <option value="Herbicidas">Herbicidas</option>
            <option value="Sensores">Sensores</option>
            <option value="Pantallas">Pantallas</option>
          </select>
        </label>

        <label>
          Bodega
          <input
            type="text"
            name="warehouse"
            onChange={handleProductChange}
            placeholder="Bodega"
            required
          />
        </label>
        <label>
          Descripción
          <input
            type="text"
            name="description"
            onChange={handleProductChange}
            placeholder="Descripción del producto"
            required
          />
        </label>
        <label>
          Precio
          <input
            type="number"
            name="price"
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
        <button type="submit">Agregar Producto</button>
      </form>

      {/* Formulario para subir imágenes */}
      <h2>Agregar Imágenes del Producto</h2>
      <form onSubmit={handleImageSubmit} className="image-form">
        <label>
          Imagen 1
          <input type="file" name="image1" accept="image/*" onChange={handleImageChange} />
        </label>
        <label>
          Imagen 2
          <input type="file" name="image2" accept="image/*" onChange={handleImageChange} />
        </label>
        <label>
          Imagen 3
          <input type="file" name="image3" accept="image/*" onChange={handleImageChange} />
        </label>
        <button type="submit">Subir Imágenes</button>
      </form>

      {/* Mostrar mensaje de estado */}
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default AddProduct;
