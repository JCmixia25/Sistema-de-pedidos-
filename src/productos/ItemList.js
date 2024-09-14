<<<<<<< HEAD
import React from 'react';
import Item from './Item';
=======
import Item from './Item'
import ItemListContainer from './ItemListContainer'
import "./ItemList.css"
>>>>>>> df6fa8078b686725bcef05cc07617e177b6b3ae2

const ItemList = ({ productos }) => {
    return (
<<<<<<< HEAD
        <div>
            {productos.map((producto) => (
                <Item key={producto.id} producto={producto} />
            ))}
=======
        <div className="container-producto">
            <h2>Productos</h2>
            <div >
                {/* { productos.map((prod) => <h2 key={prod.id}>{prod.titulo}</h2> )} */}
                {productos.map((prod) => <Item producto={prod} key={productos.id}/>)}
            </div>
>>>>>>> df6fa8078b686725bcef05cc07617e177b6b3ae2
        </div>
    );
}

export default ItemList;
