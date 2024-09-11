import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import './Home.css'; // Asegúrate de tener este archivo CSS
import { FaSearch } from 'react-icons/fa';
import agricultura from '../imagenes/agricultura.jpg';
import cosechadora from '../imagenes/cosechadora.jpg';
import carreta from '../imagenes/carreta.jpg';
import hercules from '../imagenes/hercules.jpg';
import plataforma from '../imagenes/plataforma.jpg';

const categories = [
  {
    name: 'Fertilizantes',
    products: [
      { id: 1, name: 'Liquido', image: agricultura },
      { id: 2, name: 'Granulado', image: cosechadora },
    ],
  },
  {
    name: 'Herbicidas',
    products: [
      { id: 3, name: 'Residuales', image: carreta },
      { id: 4, name: 'Foliares', image: hercules },
    ],
  },
  {
    name: 'Sensores',
    subcategories: [
      {
        name: 'Suelo',
        products: [
          { id: 5, name: 'Sensor de Humedad', image: plataforma },
          { id: 6, name: 'Sensor de pH', image: agricultura },
        ],
      },
      {
        name: 'Clima',
        products: [
          { id: 7, name: 'Termometro', image: cosechadora },
          { id: 8, name: 'Higrómetro', image: hercules },
        ],
      },
      {
        name: 'Planta',
        products: [
          { id: 9, name: 'Sensor de Luz', image: plataforma },
        ],
      },
      {
        name: 'Agua',
        products: [
          { id: 10, name: 'Sensor de Nivel', image: agricultura },
          { id: 11, name: 'Pluviometro', image: hercules },
        ],
      },
    ],
  },
];

const Home = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    setSuggestions(findProductsByName(term)); // Actualiza las sugerencias
  };

  const handleProductClick = (productId) => {
    navigate(`/home/${productId}`);
  };

  const toggleCategory = (index) => {
    setExpandedCategory(expandedCategory === index ? null : index);
  };

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      const product = findProductByName(searchTerm);
      if (product) {
        handleProductClick(product.id);
      }
    }
  };

  const findProductByName = (name) => {
    for (const category of categories) {
      const products = category.products || [];
      if (category.subcategories) {
        for (const subcategory of category.subcategories) {
          const matchedProduct = subcategory.products.find(product => 
            product.name.toLowerCase() === name.toLowerCase()
          );
          if (matchedProduct) return matchedProduct;
        }
      } else {
        const matchedProduct = products.find(product => 
          product.name.toLowerCase() === name.toLowerCase()
        );
        if (matchedProduct) return matchedProduct;
      }
    }
    return null; // No se encontró el producto
  };

  const findProductsByName = (name) => {
    const results = [];
    for (const category of categories) {
      const products = category.products || [];
      if (category.subcategories) {
        for (const subcategory of category.subcategories) {
          const matchedProducts = subcategory.products.filter(product => 
            product.name.toLowerCase().includes(name.toLowerCase())
          );
          results.push(...matchedProducts);
        }
      } else {
        const matchedProducts = products.filter(product => 
          product.name.toLowerCase().includes(name.toLowerCase())
        );
        results.push(...matchedProducts);
      }
    }
    return results; // Retorna todos los productos coincidentes
  };

  return (
    <div className="home-container">
      <h1>Productos de Pedidos Persia</h1>

      {suggestions.length > 0 && (
        <div className="suggestions-list">
          {suggestions.map(product => (
            <div
              key={product.id}
              className="suggestion-item"
              onClick={() => handleProductClick(product.id)}
            >
              <img src={product.image} alt={product.name} />
              <span>{product.name}</span>
            </div>
          ))}
        </div>
      )}
      <div className="categories">
        {categories.map((category, index) => (
          <div key={index}>
            <h2 onClick={() => toggleCategory(index)} className="category-title">
              {category.name}
            </h2>
            {expandedCategory === index && (
              <div className="subcategory-list">
                {category.subcategories ? (
                  category.subcategories.map((subcategory, subIndex) => (
                    <div key={subIndex}>
                      <h3 className="subcategory-title">{subcategory.name}</h3>
                      <div className="products-list">
                        {subcategory.products
                          .filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
                          .map(product => (
                            <div
                              className="product-card"
                              key={product.id}
                              onClick={() => handleProductClick(product.id)}
                            >
                              <img src={product.image} alt={product.name} />
                              <h4>{product.name}</h4>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="products-list">
                    {category.products
                      .filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
                      .map(product => (
                        <div
                          className="product-card"
                          key={product.id}
                          onClick={() => handleProductClick(product.id)}
                        >
                          <img src={product.image} alt={product.name} />
                          <h4>{product.name}</h4>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;