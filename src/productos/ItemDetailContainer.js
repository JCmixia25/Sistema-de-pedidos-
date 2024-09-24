import React, { useState, useEffect, useContext } from "react";
import { pedirItemPorId } from "../helpers/pedirDatos";
import ItemDetail from "./ItemDetail";
import { useParams } from "react-router-dom";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../conexion/firebase";

const ItemDetailContainer = ({ onAddToCart }) => {
  const [item, setItem] = useState(null);

  const [imagenes, setImagenes] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const docRef = doc(db, "productos", id);

    const docImg = collection(db, "imagenes");
    const q = query(docImg, where("producto_id", "==", id));

    getDoc(docRef).then((resp) => {
      // console.log(resp);
      setItem({ ...resp.data(), id: resp.id });
    });

    getDocs(q).then((resp) => {
      // console.log(resp.docs[0].data());

      setImagenes(
        resp.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
      );
    });
    
    console.log("imagenes", imagenes)
    // pedirItemPorId(Number(id)).then((res) => {
    //   setItem(res);
    // });
  }, [id]);

  // console.log("imagenes", imagenes[0].imagen_1);
  return (
    <div className="item-detail-container">
      {imagenes && item && (
        <ItemDetail
          item={item}
          onAddToCart={onAddToCart}
          imagenes={imagenes}
        />
      )}
    </div>
  );
};

export default ItemDetailContainer;
