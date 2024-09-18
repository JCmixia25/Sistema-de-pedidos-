import React, { useState, useEffect } from 'react';
import { pedirItemPorId } from '../helpers/pedirDatos';
import ItemDetail from './ItemDetail';
import { useParams } from 'react-router-dom';

const ItemDetailContainer = ({ onAddToCart }) => {
  const [item, setItem] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    pedirItemPorId(Number(id)).then((res) => {
      setItem(res);
    });
  }, [id]);

  return (
    <div className="item-detail-container">
      {item && <ItemDetail item={item} onAddToCart={onAddToCart} />}
    </div>
  );
};

export default ItemDetailContainer;