import React, { useContext, useState } from 'react';
import "./ItemDetail.css";
import { CartContext } from '../context/CartContext';

const ItemDetail = ({ item, onAddToCart }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === item.imagenes.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? item.imagenes.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="item-detail">
      <div className="carousel">
        <button onClick={handlePrevImage} className="prev-btn">&#10094;</button>
        <img src={item.imagenes[currentImageIndex]} alt={item.titulo} className="carousel-image" />
        <button onClick={handleNextImage} className="next-btn">&#10095;</button>
      </div>

      <div className="item-detail-text">
        <h3>{item.titulo}</h3>
        <p>{item.descripcion}</p>
        <p className="item-category">Categoría: {item.categoria}</p>
        <p className="item-price">Q{item.precio}</p>
        <button onClick={() => onAddToCart(item)} className="add-to-cart-btn">Agregar al carrito</button>
      </div>
    </div>
  );
};

export default ItemDetail;
