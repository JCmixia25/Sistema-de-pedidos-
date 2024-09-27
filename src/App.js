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
import { useAuth } from "./context/authContext.js";
import { Encabezado } from "./components-private/Encabezado.js";
import Informacion from "./components-private/informacion.js";
import PieDePagina from "./components/PieDePagina.js";
import ListaProductos from "./productos/ListaProductos";
import ItemDetailContainer from "./productos/ItemDetailContainer.js";
import ItemListContainer from "./productos/ItemListContainer.js";
import VerticalButtons from "./components/VerticalButtons.js";
import { useEffect, useState } from "react";
import { CartContext, CartProvider } from "./context/CartContext.js";
import Contacto from "./productos/Contacto.js";
import ItemDetail from "./productos/ItemDetail.js";
import Cookies from "js-cookie";
import { ValidarRol } from "./context/ValidarRol.js";

function App() {
  const { estado, datosUsuario  } = useAuth();
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda
  const [isBlinking, setIsBlinking] = useState(false); // Estado para el parpadeo


  useEffect(() => {
    if (Cookies.get("cart")) {
      const carrito = Cookies.get("cart");
      setCart(JSON.parse(carrito));
    }
  }, []);

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

    Cookies.set(
      "cart",
      JSON.stringify([...cart, { ...producto, cantidad: 1 }])
    );
  };

  // return (
  //   <div className="App">
  //     {estado ? (
  //       <Encabezado/>
  //     ) : (
  //       <Botones setSearchTerm={setSearchTerm} isBlinking={isBlinking} />
  //     )}
  //     <Routes>
  //       <Route path="/" element={<Bienvenida />} />
  //       <Route path="/inicio" element={<Home />} />
  //       <Route path="/login" element={<Login />} />
  //       <Route path="/agregarpro" element={<Agregarpro />} />
  //       <Route path="/register" element={<Register />} />
  //       <Route path="/contact" element={<Contacts />} />
  //       <Route path="/home/:id" element={<ProductDetail />} />
  //       <Route path="/listaProductos" element={<ListaProductos />} />
  //       <Route
  //         path="/item/:id"
  //         element={<ItemDetailContainer onAddToCart={agregarAlCarrito} />}
  //       />
  //       <Route
  //         path="/productos"
  //         element={<ItemListContainer onAddToCart={agregarAlCarrito} searchTerm={searchTerm} />}
  //       />
  //       <Route path="/detalle" element={<ItemDetail />} />
  //       <Route
  //         path="/productos/:categoria"
  //         element={<ItemListContainer onAddToCart={agregarAlCarrito} searchTerm={searchTerm} />}
  //       />
  //       <Route path="/carrito" element={<Carrito productos={cart} setProductos={setCart} setBlinking={setIsBlinking} />} />
  //       <Route path="/contacto" element={<Contacto />} />
  //       <Route path="/informacion" element={<Informacion />} />
  //       <Route path="/listBotones" element={<VerticalButtons />} />
  //     </Routes>
  //     <PieDePagina />
  //   </div>
  // );

  if (!estado) {
    return (
      <div className="App">
        <Botones />
        <Routes>
          <Route path="/" element={<Bienvenida />} />
          <Route path="/bienvenida" element={<Bienvenida />} />
          <Route path="/inicio" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/agregarpro" element={<Agregarpro />} />
          {/* Pasar el carrito y la función agregar al carrito a los componentes */}
          <Route
            path="/carrito"
            element={<Carrito productos={cart} setProductos={setCart} />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contacts />} />
          <Route path="/home/:id" element={<ProductDetail />} />
          <Route path="/listaProductos" element={<ListaProductos />} />
          <Route
            path="/item/:id"
            element={<ItemDetailContainer onAddToCart={agregarAlCarrito} />}
          />
          <Route
            path="/productos"
            element={<ItemListContainer onAddToCart={agregarAlCarrito} />}
          />
          <Route path="/detalle" element={<ItemDetail />} />
          <Route
            path="/productos/:categoria"
            element={<ItemListContainer onAddToCart={agregarAlCarrito} />}
          />
          <Route path="/listBotones" element={<VerticalButtons />} />
          <Route path="/contacto" element={<Contacto />} />
        </Routes>
        <PieDePagina />
      </div>
    );
  } else {
    return (
      <div className="App">
        <Encabezado />
        <Routes>
          <Route path="/" element={<Bienvenida />} />
          {/* <Route path="/inicio" element={ <Bienvenida />} />
          <Route path="/informacion" element={<Informacion />} /> */}
            {/* <ValidarRol rol={ datosUsuario[0].rol}/> */}
          <Route
            path="/productos"
            element={<ItemListContainer onAddToCart={agregarAlCarrito} />}
          />
          <Route
            path="/item/:id"
            element={<ItemDetailContainer onAddToCart={agregarAlCarrito} />}
          />
          <Route
            path="/productos/:categoria"
            element={<ItemListContainer onAddToCart={agregarAlCarrito} />}
          />
          <Route
            path="/carrito"
            element={<Carrito productos={cart} setProductos={setCart} />}
          />
        </Routes>
        <PieDePagina />
      </div>
    );
  }
}

export default App;
