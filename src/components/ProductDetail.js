import React from 'react';
import { useParams } from 'react-router-dom';

// Asegúrate de importar o definir la lista de productos si es necesario.

const ProductDetail = () => {
  const { id } = useParams();
  
  // Suponiendo que tienes una forma de obtener el producto, aquí puedes cambiar la lógica.
  // Por ejemplo, si `getProductById` es una función que obtiene el producto por ID:
  // const product = getProductById(id);

  // Aquí hay un ejemplo de un producto ficticio:
  const product = {
    id: 1,
    name: 'Producto Ejemplo',
    description: 'Descripción del producto.',
    image: 'ruta/a/la/imagen.jpg',
  };

  if (!product) {
    return <div>Producto no encontrado:</div>;
  }

  return (
    <div className="product-detail">
      <h1>{product.name}</h1>
      <p className="product-description">{product.description}</p>
      <img src={product.image} alt={product.name} className="product-image" />
    </div>
  );
};

export default ProductDetail;