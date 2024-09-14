import { useEffect, useState } from 'react';
import ItemList from "./ItemList";
<<<<<<< HEAD
import { pedirDatos } from "../helpers/pedirDatos"; // Asegúrate que la ruta es correcta
=======
import { pedirDatos } from "../helpers/pedirDatos"
import "./ItemListContainer.css"
>>>>>>> df6fa8078b686725bcef05cc07617e177b6b3ae2

const ItemListContainer = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true); // Estado para controlar la carga

    useEffect(() => {
        // Simula la petición de datos
        pedirDatos()
            .then((res) => {
                setProductos(res); // Almacena los productos en el estado
            })
            .catch((error) => {
                console.error("Error al cargar los productos:", error);
            })
            .finally(() => {
                setLoading(false); // Finaliza la carga
            });
    }, []);

<<<<<<< HEAD
    if (loading) {
        return <p>Cargando productos...</p>; // Mensaje mientras se cargan los productos
    }

    return (
        <div>
            <ItemList productos={productos} /> {/* Pasamos los productos a ItemList */}
=======
    return(
        <div className="container-productos">
            {/* <ItemList productos={productos}/> */}
            {/* <ItemListContainer/> */}
            <ItemList productos={productos}/>
>>>>>>> df6fa8078b686725bcef05cc07617e177b6b3ae2
        </div>
    );
}

export default ItemListContainer;
