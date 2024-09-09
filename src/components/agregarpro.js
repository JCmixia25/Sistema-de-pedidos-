import React, { useState } from "react";
import "./agregarpro.css"; // Archivo CSS para los estilos
import { useNavigate } from "react-router-dom";

export function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleProductChange = ({ target: { name, value } }) => {
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleProductSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar la lógica para agregar el producto
    console.log("Producto agregado:", product);
    setMessage("Producto agregado exitosamente");
    navigate("/productos");
  };

  const handleImageSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar la lógica para subir la imagen
    if (image) {
      console.log("Imagen subida:", image);
      setMessage("Imagen subida exitosamente");
    } else {
      setMessage("Por favor, selecciona una imagen.");
    }
  };

  return (
    <div className="add-product-container">
      <h2>Agregar Producto</h2>

      {/* Formulario para agregar producto */}
      <form onSubmit={handleProductSubmit} className="product-form">
      <label>
          Codigo del Producto
          <input
            type="text"
            name="name"
            onChange={handleProductChange}
            placeholder="Codigo del producto"
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
        <label>
          Categoria
          <input
            type="text"
            name="name"
            onChange={handleProductChange}
            placeholder="Categoria"
            required
          />
        </label>
        <label>
          Bodega
          <input
            type="text"
            name="name"
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
            name="name"
            onChange={handleProductChange}
            placeholder="Cantidad en stock"
            required
          />
        </label>
        <button type="submit">Agregar Producto</button>
      </form>

      {/* Formulario para subir imagen */}
      <h2>Subir Imagen del Producto</h2>
      <form onSubmit={handleImageSubmit} className="image-form">
        <label>
          Imagen del Producto
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>
        <button type="submit">Subir Imagen</button>
      </form>

      {/* Mostrar mensaje de estado */}
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default AddProduct;
