import React, { useContext, useState } from "react";
import "./ItemDetail.css";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import { useAuth } from "../context/authContext";

const ItemDetail = ({ item, onAddToCart, imagenes }) => {
  const { carrito, setCarrito } = useAuth();
  console.log(carrito);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate(); // Inicializar useNavigate

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === imagenes.length - 1 ? 0 : prevIndex + 1
    );
    
  };
  console.log("uno", currentImageIndex);
  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? imagenes.length - 1 : prevIndex - 1
    );
  };

  const handleAddToCart = () => {
    onAddToCart(item); // Agregar al carrito
    navigate("/carrito"); // Redirigir a la página de productos
  };

  return (
    <div className="item-detail">
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
        <p className="item-category">Categoría: {item.categoria}</p>
        <p className="item-price">Q{item.precio}</p>
        <button onClick={handleAddToCart} className="add-to-cart-btn">
          Agregar al carrito
        </button>
      </div>
    </div>
  );
};

export default ItemDetail;
