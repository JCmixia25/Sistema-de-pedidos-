import React, { useState, useEffect } from 'react';
import './Bienvenida.css'; 

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
      goToNext(); 
    }, 2000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="carrusel">
      <div className="carrusel-shadow"></div> {/* Capa de sombra */}
      <header className="texto">
        <p className="texto-mensaje">BIENVENIDO PEDIDOS PERSIA</p>
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
