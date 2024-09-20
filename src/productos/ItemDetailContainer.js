import React, { useState, useEffect, useContext } from 'react';
import { pedirItemPorId } from '../helpers/pedirDatos';
import ItemDetail from './ItemDetail';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../conexion/firebase';

const ItemDetailContainer = ({ onAddToCart }) => {
  const [item, setItem] = useState(null);
  const id = useParams().id;

  useEffect(() => {

    const docRef = doc(db, "productos", id);
    getDoc(docRef)
      .then((resp) => {
        // console.log(resp);
        setItem({ ...resp.data(), id: resp.id })

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