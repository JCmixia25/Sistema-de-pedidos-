import { useEffect, useState } from "react";
import ItemList from "./ItemList";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../conexion/firebase";
import VerticalButtons from "../components/VerticalButtons";
import { useParams } from "react-router-dom";
import "./ItemListContainer.css";

// Función para normalizar texto (eliminar tildes y convertir a minúsculas)
const normalizeText = (text) => {
  return text
    .normalize("NFD") // Descomponer caracteres acentuados
    .replace(/[\u0300-\u036f]/g, "") // Eliminar tildes
    .toLowerCase(); // Convertir a minúsculas
};

const ItemListContainer = ({ onAddToCart, searchTerm }) => {
  const [productos, setProductos] = useState([]);
  const [titulo, setTitulo] = useState("PRODUCTOS");
  const categoria = useParams().categoria;

  useEffect(() => {
    const fetchProducts = async () => {
      const productosRef = collection(db, "productos");
      const q = categoria ? query(productosRef, where("categoria", "==", categoria)) : productosRef;

      const resp = await getDocs(q);
      const allProducts = resp.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

      // Filtrar productos por término de búsqueda en toda la descripción
      const filteredProducts = searchTerm
        ? allProducts.filter((prod) =>
            normalizeText(prod.titulo).includes(normalizeText(searchTerm)) // Busca en toda la descripción normalizada
          )
        : allProducts;

      setProductos(filteredProducts);
    };

    fetchProducts();
  }, [categoria, searchTerm]); // Dependencias del useEffect

  return (
    <div className="container-primario">
      <div className="container-izquierdo">
        <VerticalButtons />
      </div>
      <div className="container-derecho">
        <ItemList productos={productos} titulo={titulo} onAddToCart={onAddToCart} />
      </div>
    </div>
  );
};

export default ItemListContainer;