import React from 'react'
import "./Item.css"

const Item = ( {producto}) => {
    return(
        <div className="container-datos-productos">
            <img className="imagen-producto" alt="No se puedo mostrar la imagen " src={producto.imagen}/>
            <div>
                <h4>{producto.titulo}</h4>
                <p className="informacion-producto">Precio: ${producto.precio}</p>
                <p className="informacion-producto">Categoria: {producto.categoria}</p>
                <p className="informacion-producto">{producto.descripcion}</p>
                <a className="informacion-producto" href={`/item/${producto.id}`}>Ver más</a>
            </div>
        </div>
    )
}

export default Item