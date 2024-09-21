import { useEffect, useState } from "react";
import ItemList from "./ItemList";
import { pedirDatos } from "../helpers/pedirDatos";
import { NavLink, useParams } from "react-router-dom";
import VerticalButtons from "../components/VerticalButtons";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../conexion/firebase";

const ItemListContainer = () => {
  const [productos, setProductos] = useState([]);
  const [titulo, setTitulo] = useState("PRODUCTOS");

  const categoria = useParams().categoria;
  console.log("categoria: ", categoria);

  useEffect(() => {
    const productosRef = collection(db, "productos");
    //Realiza filtración de productos
    
    const q = categoria ? query(productosRef, where("categoria", "==", categoria)) : productosRef;

    getDocs(q).then((resp) => {
      // console.log(resp.docs[0].data());

      setProductos(
        resp.docs.map((doc) => {
          return { ...doc.data(), id: doc.id}
        })
      )
    });

    //setProductos(pedirDatos);
    // pedirDatos().then((res) => {
    //   if (categoria) {
    //     setProductos(res.filter((prod) => prod.categoria === categoria));
    //     setTitulo(categoria.toUpperCase());
    //   } else {
    //     setProductos(res);
    //     setTitulo("PRODUCTOS");
    //   }
    // });
  }, [categoria]);

  return (
    <div className="container-primario">
      <div className="container-izquierdo">
        <VerticalButtons />
      </div>
      <div className="home-container">
        <ItemList productos={productos} titulo={titulo} />
      </div>
    </div>
  );
};

export default ItemListContainer;
