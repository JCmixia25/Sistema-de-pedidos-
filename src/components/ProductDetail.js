import React from 'react';
import { useParams } from 'react-router-dom';
import agricultura from '../imagenes/agricultura.jpg';
import cosechadora from '../imagenes/cosechadora.jpg';
import carreta from '../imagenes/carreta.jpg';
import hercules from '../imagenes/hercules.jpg';
import plataforma from '../imagenes/plataforma.jpg';

const products = [
  { id: 1, name: 'Líquido', image: agricultura, description: 'Fertilizante líquido para cultivos.' },
  { id: 2, name: 'Granulado', image: cosechadora, description: 'Fertilizante granular de liberación lenta.' },
  { id: 3, name: 'Residuales', image: carreta, description: 'Herbicida residual para control de malezas.' },
  { id: 4, name: 'Foliares', image: hercules, description: 'Herbicida foliar para aplicación directa.' },
  { id: 5, name: 'Sensor de Humedad', image: plataforma, description: 'Mide la humedad del suelo para riego eficiente.' },
  { id: 6, name: 'Sensor de pH', image: agricultura, description: 'Determina el nivel de pH en el suelo.' },
  { id: 7, name: 'Termómetro', image: cosechadora, description: 'Mide la temperatura del ambiente.' },
  { id: 8, name: 'Higrómetro', image: hercules, description: 'Mide la humedad relativa del aire.' },
  { id: 9, name: 'Sensor de Luz', image: plataforma, description: 'Mide la intensidad de luz en el cultivo.' },
  { id: 10, name: 'Sensor de Nivel', image: agricultura, description: 'Monitorea el nivel de agua en sistemas de riego.' },
  { id: 11, name: 'Pluviometro', image: hercules, description: 'Mide la cantidad de precipitación en un área.' },
];

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return <div>Producto no encontrado:</div>;
  }

  return (
    <div className="product-detail">
      <h1>{product.name}</h1>
      <p className="product-description">{product.description}</p> {/* Descripción centrada */}
      <img src={product.image} alt={product.name} className="product-image" />
    </div>
  );
};

export default ProductDetail;