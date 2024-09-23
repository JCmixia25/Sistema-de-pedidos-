import Item from './Item'
import ItemListContainer from './ItemListContainer'
import "./ItemList.css"


const ItemList = ( {productos, titulo, onAddToCart} ) =>  {
    return (
        <div>
            <h3 className="text-titulo">{titulo}</h3>
            <div className="container-productojs">
                {/* { productos.map((prod) => <h2 key={prod.id}>{prod.titulo}</h2> )} */}
                {productos.map((prod) => <Item producto={prod} key={productos.id} onAddToCart={onAddToCart}/>)}
            </div>
        </div>
    )
}

export default ItemList