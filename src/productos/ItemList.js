import Item from './Item'
import ItemListContainer from './ItemListContainer'
import "./ItemList.css"


const ItemList = ( {productos} ) =>  {
    return (
        <div>
            <h2>Productos</h2>
            <div className="container-productojs">
                {/* { productos.map((prod) => <h2 key={prod.id}>{prod.titulo}</h2> )} */}
                {productos.map((prod) => <Item producto={prod} key={productos.id}/>)}
            </div>
        </div>
    )
}

export default ItemList