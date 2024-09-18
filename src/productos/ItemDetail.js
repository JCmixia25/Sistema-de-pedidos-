import React, { useState } from 'react';
import "./ItemDetail.css";


const ItemDetail = ({ item }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Función para avanzar a la siguiente imagen
    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === item.imagenes.length - 1 ? 0 : prevIndex + 1
        );
    };

    // Función para retroceder a la imagen anterior
    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? item.imagenes.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className='item-detail'>
            <div className='carousel'>
                <button onClick={handlePrevImage} className="prev-btn">
                    &#10094;
                </button>
                <img
                    src={item.imagenes[currentImageIndex]}
                    alt={item.titulo}
                    className="carousel-image"
                />
                <button onClick={handleNextImage} className="next-btn">
                    &#10095;
                </button>
            </div>

            <div className='item-detail-text'>
                <h3>{item.titulo}</h3>
                <p>{item.descripcion}</p>
                <p className='item-category'>Categoría: {item.categoria}</p>
                <p className='item-price'>Q{item.precio}</p>
            </div>
        </div>
    );
};

export default ItemDetail;
