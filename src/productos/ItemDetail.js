const ItemDetail = ({ item }) => {
  return (
    <div className="item-detail-container">
      <img src={item.imagen} alt={item.titulo} />
      <div>
        <h3>{item.titulo}</h3>
        <p>{item.descripcion}</p>
        <p>Categoría: {item.categoria}</p>
        <p>Q{item.precio}</p>
      </div>
    </div>
  );
}

export default ItemDetail;
