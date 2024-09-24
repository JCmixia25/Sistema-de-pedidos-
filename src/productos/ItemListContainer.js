import { useEffect, useState } from "react";
import ItemList from "./ItemList";
import { pedirDatos } from "../helpers/pedirDatos";
import { NavLink, useParams } from "react-router-dom";
import VerticalButtons from "../components/VerticalButtons";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../conexion/firebase";
import "./ItemListContainer.css";

<<<<<<< HEAD


const ItemListContainer = () => {
=======
const ItemListContainer = ({onAddToCart}) => {
>>>>>>> cd97c3f603ae9ae7f1105e2cdb3070443ac0bcc2
  const [productos, setProductos] = useState([]);
  const [titulo, setTitulo] = useState("PRODUCTOS");

  const categoria = useParams().categoria;

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
<<<<<<< HEAD
      <div className="home-container">
        <ItemList productos={productos} />
      
=======
      <div className="container-derecho">
        <ItemList productos={productos} titulo={titulo} onAddToCart={onAddToCart}/>
       
>>>>>>> cd97c3f603ae9ae7f1105e2cdb3070443ac0bcc2
      </div>
    </div>
  );
};

export default ItemListContainer;
