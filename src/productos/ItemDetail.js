import React, { useContext, useState } from 'react';
import "./ItemDetail.css";
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import { useAuth } from '../context/authContext';

const ItemDetail = ({ item, onAddToCart}) => {


  const { carrito, setCarrito } = useAuth();
  console.log(carrito);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate(); // Inicializar useNavigate

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

  // const handleAgregar = () => {
  //   const itemAgregado = {...item, cantidad};
  //   if(carrito.find((producto) => producto.id === itemAgregado.id)){
      
  //     console.log("Está en el carrito")
  //   } else {
  //     console.log("No está en el carrito");
  //   }

  //   setCarrito([...carrito, itemAgregado]);
  //   console.log(itemAgregado);
  // }

  const handleAddToCart = () => {
    ItemDetail(item); // Agregar al carrito
    navigate("/productos"); // Redirigir a la página de productos
  };

  return (
    <div className="item-detail">
      <div className="carousel">
        <button onClick={handlePrevImage} className="prev-btn">&#10094;</button>
        <img src={item.imagen} alt={item.titulo} className="carousel-image" />
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