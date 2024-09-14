const Item = ({ producto }) => {
    return (
      <div className="item-container">
        <img alt="No se pudo mostrar la imagen" src={producto.imagen} />
        <div>
          <h4>{producto.titulo}</h4>
          <p>Precio: ${producto.precio}</p>
          <p>Categoría: {producto.categoria}</p>
          <p>{producto.descripcion}</p>
          <a href={`/item/${producto.id}`}>Ver más</a>
        </div>
      </div>
    );
  }
  
  export default Item;
  