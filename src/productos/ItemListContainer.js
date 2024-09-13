import { useEffect, useState } from 'react';
import ItemList from "./ItemList";
import { pedirDatos } from "../helpers/pedirDatos"

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
        <div>
            {/* <ItemList productos={productos}/> */}
            {/* <ItemListContainer/> */}
            <ItemList productos={productos}/>
        </div>
    );
}

export default ItemListContainer