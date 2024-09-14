import { useEffect, useState } from 'react';
import ItemList from "./ItemList";
import { pedirDatos } from "../helpers/pedirDatos"; // Asegúrate que la ruta es correcta

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

    if (loading) {
        return <p>Cargando productos...</p>; // Mensaje mientras se cargan los productos
    }

    return (
        <div>
            <ItemList productos={productos} /> {/* Pasamos los productos a ItemList */}
        </div>
    );
}

export default ItemListContainer;
