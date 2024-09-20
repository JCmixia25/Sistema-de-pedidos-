import { NavLink, Route, Routes } from "react-router-dom";
import "./App.css";
import { Botones } from "./components/Botones";
import Login from "./components/Login.js";
import Register from "./components/Register.js";
import Home from "./components/Home.js";
import Contacts from "./components/Contacts.js";
import Agregarpro from "./components/agregarpro.js";
import Carrito from "./components/Carrito.js";
import Bienvenida from "./components/Bienvenida.jsx";
import ProductDetail from "./components/ProductDetail";
import icono from "./icono.jpeg";
import { useAuth } from "./context/authContext.js";
import Inicio from "./components-private/Inicio.js";
import { Encabezado } from "./components-private/Encabezado.js";
import Show from "./components/Show.js";
import PieDePagina from "./components/PieDePagina.js";
import ListaProductos from "./productos/ListaProductos";
import ItemDetailContainer from "./productos/ItemDetailContainer.js";
import ItemListContainer from "./productos/ItemListContainer.js";
import VerticalButtons from "./components/VerticalButtons.js";
import { useState } from "react";
import { CartContext } from "./context/CartContext.js";
import Contacto from "./productos/Contacto.js";

function App() {
  const { estado } = useAuth();

  // Estado para manejar el carrito
  const [cart, setCart] = useState([]);

  // Función para agregar productos al carrito
  const agregarAlCarrito = (producto) => {
    const productoExistente = cart.find((prod) => prod.id === producto.id);

    if (productoExistente) {
      setCart(
        cart.map((prod) =>
          prod.id === producto.id
            ? { ...prod, cantidad: prod.cantidad + 1 }
            : prod
        )
      );
    } else {
      setCart([...cart, { ...producto, cantidad: 1 }]);
    }
  };

  if (!estado) {
    return (
      <div className="App">
        <CartContext.Provider  value={cart}/>
        <Botones />
        <Routes>
          <Route path="/" element={<Bienvenida />} />
          <Route path="/bienvenida" element={<Bienvenida />} />
          <Route path="/inicio" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/agregarpro" element={<Agregarpro />} />
          <Route path="/carrito" element={<Carrito productos={cart} setProductos={setCart} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contacts />} />
          <Route path="/home/:id" element={<ProductDetail />} />
          <Route path="/listaProductos" element={<ListaProductos />} />
          <Route path="/item/:id" element={<ItemDetailContainer onAddToCart={agregarAlCarrito} />} />
          <Route path="/productos" element={<ItemListContainer />} />
          <Route path="/productos/:categoria" element={<ItemListContainer />} />
          <Route path="/listBotones" element={<VerticalButtons />} />
          <Route path="/contacto" element={<Contacto />} />
        </Routes>
        <PieDePagina />
        <CartContext.Provider />
      </div>
    );
  } else {
    return (
      <div className="App">
        <img src={icono} alt="Icono" className="icono" />
        <Encabezado />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/inicio" element={<Inicio />} />
        </Routes>
      </div>
    );
  }
}

export default App;