import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Asegúrate de tener este archivo CSS
import agricultura from '../imagenes/agricultura.jpg';
import cosechadora from '../imagenes/cosechadora.jpg';
import carreta from '../imagenes/carreta.jpg';
import hercules from '../imagenes/hercules.jpg';
import plataforma from '../imagenes/plataforma.jpg';

const products = [
  { id: 1, name: 'Maquinaria Agricola', image: agricultura },
  { id: 2, name: 'Cosechadora de Maiz', image: cosechadora },
  { id: 3, name: 'Carretas', image: carreta },
  { id: 4, name: 'Hercules 10000 Inox', image: hercules },
  { id: 5, name: 'Plataforma de Maiz', image: plataforma },
];

const Home = () => {
  const navigate = useNavigate();

  const handleProductClick = (productId) => {
    // Redirige a la vista de detalles del producto
    navigate(`/home/${productId}`);
  };

  return (
    <div className="home-container">
      <h1>Productos de Pedidos Persia</h1>
      <div className="products-grid">
        {products.map(product => (
          <div className="product-card" key={product.id} onClick={() => handleProductClick(product.id)}>
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;