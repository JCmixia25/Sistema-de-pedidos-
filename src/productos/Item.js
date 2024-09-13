import React from 'react'

const Item = ( {producto}) => {
    return(
        <div>
            <img alt="No se puedo mostrar la imagen " src={producto.imagen}/>
            <div>
                <h4>{producto.titulo}</h4>
                <p>Precio: ${producto.precio}</p>
                <p>Categoria: {producto.categoria}</p>
                <p>{producto.descripcion}</p>
                <a href={`/item/${producto.id}`}>Ver más</a>
            </div>
        </div>
    )
}

export default Item