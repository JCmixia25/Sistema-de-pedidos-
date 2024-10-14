// src/components/Carrusel.jsx

import React, { useState, useEffect } from 'react';
import './Bienvenida.css'; // Asegúrate de que este archivo esté enlazado correctamente

const Carrusel = () => {
  const images = [
    { src: '/imagenes/traa.webp', alt: 'Image 1' },
    { src: '/imagenes/abono.jpg', alt: 'Image 2' },
    { src: '/imagenes/abono.webp', alt: 'Image 3' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstImage = currentIndex === 0;
    const newIndex = isFirstImage ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastImage = currentIndex === images.length - 1;
    const newIndex = isLastImage ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();  // Cambia a la siguiente imagen cada 3 segundos
    }, 2000);

    // Limpia el intervalo cuando el componente se desmonta
    return () => clearInterval(interval);
  }, [currentIndex]);  // Vuelve a ejecutar useEffect si cambia currentIndex

  return (
    
   
    <div className="carrusel">
    <header className="texto">
    <p className="welcome-text">BIENVENIDO PEDIDOS PERSIA</p>
    </header>
      <button className="carrusel-button left" onClick={goToPrevious}>
        &#10094;
      </button>
      <div className="carrusel-image-container">
        <img src={images[currentIndex].src} alt={images[currentIndex].alt} className="carrusel-image" />
      </div>
      <button className="carrusel-button right" onClick={goToNext}>
        &#10095;
      </button>
    </div>
  );
};

export default Carrusel;
