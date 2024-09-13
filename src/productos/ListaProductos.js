import { useEffect, useState } from "react"
import ItemList from "./ItemList";
import { useParams } from "react-router-dom"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../conexion/firebase"

const ListaProductos = () => {
    
    const [productos, setProductos] = useState([]);

    const [titulo, setTitulo ] = useState("Productos");

    const categoria = useParams().categoria;

    useEffect(() => {
      //creamos la referencia
      const productosRef = collection(db, "productos"); 
      
      getDocs(productosRef)
      .then((resp)=>{
        console.log(resp);
      })
    }, [categoria])

    return(
        <div>
            <ItemList productos={productos} titulo={titulo}/>
        </div>
    )

}

export default ListaProductos;