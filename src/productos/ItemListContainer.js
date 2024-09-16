import { useEffect, useState } from "react";
import ItemList from "./ItemList";
import { pedirDatos } from "../helpers/pedirDatos";
import { NavLink, useParams } from "react-router-dom";
import VerticalButtons from "../components/VerticalButtons";

const ItemListContainer = () => {
  const [productos, setProductos] = useState([]);
  const categoria = useParams().categoria;
  console.log(categoria);

  useEffect(() => {
    //setProductos(pedirDatos);
    pedirDatos().then((res) => {
      if (categoria) {
        setProductos(res.filter((prod) => prod.categoria === categoria));
      } else {
        setProductos(res);
      }
    });
  }, [categoria]);

  return (
    <div className="container-primario">
      <div className="container-izquierdo">
        <VerticalButtons />
      </div>
      <div className="home-container">
        <ItemList productos={productos} />
      </div>
    </div>
  );
};

export default ItemListContainer;
