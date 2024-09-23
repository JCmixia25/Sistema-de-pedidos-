import React, { useState, useEffect, useContext } from 'react';
import { pedirItemPorId } from '../helpers/pedirDatos';
import ItemDetail from './ItemDetail';
import { useParams } from 'react-router-dom';
import { doc, getDoc,collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../conexion/firebase';

const ItemDetailContainer = ({onAddToCart}) => {
    const [item, setItem] = useState(null);
    const [imagenes, setImagenes] = useState(null);

    const { id } = useParams();

  useEffect(() => {

    const docRef = doc(db, "productos", id);
    const docImg = doc(db, "imagenes", id);

    getDoc(docRef)
      .then((resp) => {
        // console.log(resp);
        setItem({ ...resp.data(), id: resp.id })

      })

    getDoc(docImg)
      .then((respuesta) => {
        setImagenes({ ...respuesta.data(), id: respuesta.id})
      })
    // pedirItemPorId(Number(id)).then((res) => {
    //   setItem(res);
    // });
  }, [id]);

  return (
    <div className="item-detail-container">
      {item && <ItemDetail item={item} onAddToCart={onAddToCart} />}
    </div>
  );
};

export default ItemDetailContainer;