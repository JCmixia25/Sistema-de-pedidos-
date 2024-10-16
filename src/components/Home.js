import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "./Home.css"; // Asegúrate de tener este archivo CSS
import { FaSearch } from "react-icons/fa";
import VerticalButtons from "./VerticalButtons"; // Si no lo usas, puedes eliminar esta línea
import ItemDetailContainer from "../productos/ItemDetailContainer"; // Si no lo usas, puedes eliminar esta línea
import ItemListContainer from "../productos/ItemListContainer"; // Si no lo usas, puedes eliminar esta línea
import { Route, Routes } from "react-router-dom";

const categories = [
  {
    name: "Fertilizantes",
    products: [
      { id: 1, name: "Liquido" }, // Eliminadas las imágenes
      { id: 2, name: "Granulado" },
    ],
  },
  {
    name: "Herbicidas",
    products: [
      { id: 3, name: "Residuales" },
      { id: 4, name: "Foliares" },
    ],
  },
  {
    name: "Sensores",
    subcategories: [
      {
        name: "Suelo",
        products: [
          { id: 5, name: "Sensor de Humedad" },
          { id: 6, name: "Sensor de pH" },
        ],
      },
      {
        name: "Clima",
        products: [
          { id: 7, name: "Termometro" },
          { id: 8, name: "Higrómetro" },
        ],
      },
      {
        name: "Planta",
        products: [{ id: 9, name: "Sensor de Luz" }],
      },
      {
        name: "Agua",
        products: [
          { id: 10, name: "Sensor de Nivel" },
          { id: 11, name: "Pluviometro" },
        ],
      },
    ],
  },
];

const Home = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
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
    if (e.key === "Enter" || e.type === "click") {
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
          const matchedProduct = subcategory.products.find(
            (product) => product.name.toLowerCase() === name.toLowerCase()
          );
          if (matchedProduct) return matchedProduct;
        }
      } else {
        const matchedProduct = products.find(
          (product) => product.name.toLowerCase() === name.toLowerCase()
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
          const matchedProducts = subcategory.products.filter((product) =>
            product.name.toLowerCase().includes(name.toLowerCase())
          );
          results.push(...matchedProducts);
        }
      } else {
        const matchedProducts = products.filter((product) =>
          product.name.toLowerCase().includes(name.toLowerCase())
        );
        results.push(...matchedProducts);
      }
    }
    return results; // Retorna todos los productos coincidentes
  };

  return (
    <div>
      <div>
        HOLA HOME
      </div>
    </div>
  );
};

export default Home;