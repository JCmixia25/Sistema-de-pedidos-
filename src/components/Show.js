import React, { useState, useEffect } from 'react'
import { Link } from 'reac-route-dom'
import { collection, getDoc, deleteDoc } from 'firebase/firestore'
import { db } from '../conexion/firebase'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

const Show = ()  => {
    //Configuracion de hooks
    const [products, SetProducts] = useState([])
    
    //Referenciamos a la BD firestore

    //Funcion para mostrar todos los docs

    //Funcion para eliminar un docs

    //Funcion de confirmacion para sweet alert 2

    //usamos useEffect

    //devolvemos vista a nuestro componente


    return(
        <div>Show</div>
    )
}

export default Show