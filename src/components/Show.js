import React, { useState, useEffect } from 'react'
// import { Link } from 'reac-route-dom'
import { BrowserRouter, Route, Link } from 'react-router-dom';

import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore'
import { db } from '../conexion/firebase'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

const Show = ()  => {
    //Configuracion de hooks
    const [products, SetProducts] = useState([])
    
    //Referenciamos a la BD firestore
    const productsCollection = collection(db, "products")

    //Funcion para mostrar todos los docs
    const getProducts = async () => {
        //obtenemos los productos de la base de datos
        const data = await getDocs(productsCollection)
        
        //registramos los productos de la base de datos
        SetProducts(
            data.docs.map( (doc) => ( {...doc.data(), id:doc.id}))
        )
        console.log(products)
    }

    //Funcion para eliminar un docs
    const deleteProduct = async (id) => {
        const productDoc = doc(db, "products", id)
        await deleteDoc(productDoc)
        getProducts()
    }

    //Funcion de confirmacion para sweet alert 2

    //usamos useEffect
    useEffect( () => {
        getProducts()
    }, [] )

    //devolvemos vista a nuestro componente


    return(
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <div className="d-grid gap-2">
                        <Link to="/create" className='btn btn-secondary mt-2 mb-2'>Create</Link>
                    </div>
                    <table className='table table-dark table-hover'>
                        <thead>
                            <tr>
                                <th>Codigo</th>
                                <th>Descripcion</th>
                            </tr>
                        </thead>
                        <tbody>
                            { products.map( (product) => (
                                <tr key={product.id}>
                                    <td>{product.codigo}</td>
                                    <td>{product.descripcion}</td>
                                    <td>
                                        <Link to={`/edit/${product.id}`} className="btn btn-light">Editar</Link>
                                        <button onClick={ () => { deleteProduct(product.id)} } className="btn btn-danger">Borrar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div> 
            </div>
        </div>
    )
}

export default Show