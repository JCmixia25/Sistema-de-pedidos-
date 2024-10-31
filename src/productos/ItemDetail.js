import React, { useContext, useState } from "react";
import "./ItemDetail.css";
import { useNavigate } from "react-router-dom";
import { authContext } from "../context/authContext";
import { ToastContainer, toast } from 'react-toastify';

const ItemDetail = ({ item, onAddToCart, imagenes }) => {
  const { datosUsuario } = useContext(authContext);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === imagenes.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? imagenes.length - 1 : prevIndex - 1
    );
  };

  const handleEditProduct = () => {
    navigate(`/agregarpro/${item.id}`, { state: { item } }); // Navegar a la vista de Agregar Producto y pasar el item como estado
  };

  const handleAddToCart = () => {
    onAddToCart(item);
    navigate("/carrito");
  };

  const esAdministrador = datosUsuario && datosUsuario.length > 0 && datosUsuario[0]?.rol === "Administrador";
  const stockDisponible = item.stock > 0;

  return (
    <div className="item-detail">
      <ToastContainer /> {/* Añadir el contenedor de Toast */}
      <div>
        {imagenes && Array.isArray(imagenes) && imagenes.length > 0 && (
          <div className="carousel">
            <button onClick={handlePrevImage} className="prev-btn">
              &#10094;
            </button>
            <img src={imagenes[currentImageIndex].imagen} alt="Error1" />
            <button onClick={handleNextImage} className="next-btn">
              &#10095;
            </button>
          </div>
        )}
        {!imagenes && <p>No se encontraron imágenes</p>}
      </div>
      <div className="item-detail-text">
        <h3>{item.titulo}</h3>
        <p>{item.descripcion}</p>
        <p className="item-category" >codigo: {item.codigo}</p>
        <p className="item-category">Categoría: {item.categoria}</p>
        <p className="item-Stock">Stock: {item.stock}</p>
        <p className="item-price">Q{item.precio.toLocaleString()}</p>

        {esAdministrador ? (
          <button onClick={handleEditProduct} className="edit-product-btn">
            Editar Producto
          </button>
        ) : (
          <button
            onClick={stockDisponible ? handleAddToCart : null}
            className={`add-to-cart-btn ${!stockDisponible ? 'btn-rojo' : ''}`}
            disabled={!stockDisponible}
          >
            {stockDisponible ? "Agregar al Carrito" : "No disponible"}
          </button>
        )}
      </div>
    </div>
  );
};

export default ItemDetail;