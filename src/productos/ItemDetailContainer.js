import React, { useState, useEffect } from 'react';
import { pedirItemPorId } from '../helpers/pedirDatos';
import ItemDetail from './ItemDetail';
import { useParams } from 'react-router-dom';

const ItemDetailContainer = () => {
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const id = useParams().id;

    useEffect(() => {
        setLoading(true);
        pedirItemPorId(Number(id))
            .then((res) => {
                setItem(res);
                console.log(item);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching item:", error);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='item-detail-container'>
            {item ? <ItemDetail item={item} /> : <div>Item not found</div>}
        </div>
    );
};

export default ItemDetailContainer;