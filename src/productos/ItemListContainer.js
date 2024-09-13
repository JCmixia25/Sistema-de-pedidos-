import { useEffect, useState } from 'react';
import ItemList from "./ItemList";
import { pedirDatos } from "../helpers/pedirDatos"
import "./ItemListContainer.css"

 const ItemListContainer = () => {
    
    const [productos, setProductos] = useState([]);
    console.log(productos);

    useEffect(() => {

        //setProductos(pedirDatos);
        pedirDatos()
            .then((res) => {
                setProductos(res);
            })
    }, [])

    return(
        <div className="container-productos">
            {/* <ItemList productos={productos}/> */}
            {/* <ItemListContainer/> */}
            <ItemList productos={productos}/>
        </div>
    );
}

export default ItemListContainer