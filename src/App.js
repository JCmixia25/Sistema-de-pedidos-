import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Botones } from "./components/Botones";
import Login from "./components/Login.js";
import Register from "./components/Register.js";
import Home from "./components/Home.js";
import Contacts from "./components/Contacts.js";
import Agregarpro from "./components/agregarpro.js";
import Bienvenida from "./components/Bienvenida.jsx";
import ProductDetail from "./components/ProductDetail"; // Importa el componente
import icono from "./icono.jpeg";
import { useAuth } from "./context/authContext.js";
import Inicio from "./components-private/Inicio.js";
import { Encabezado } from "./components-private/Encabezado.js";
import Show from './components/Show.js';
import PieDePagina from './components/PieDePagina.js';
import ListaProductos from './productos/ListaProductos'
import ItemDetailContainer from "./productos/ItemDetailContainer.js";
import ItemListContainer from "./productos/ItemListContainer.js";

function App() {
  const { estado } = useAuth();

  if (!estado) {
    return (
      <div className="App">
        {/* <img src={icono} alt="Icono" className="icono" /> */}
        <Botones />
        {/* <Show /> */}
        {/* <ItemListContainer/> */}
        {/* <ItemDetailContainer itemId={2}/> */}
         <Routes>
           <Route path="/" element={<Bienvenida />} />
          <Route path="/bienvenida" element={<Bienvenida />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/agregarpro" element={<Agregarpro />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contacts />} />
          <Route path="/home/:id" element={<ProductDetail />} />{" "}
          <Route path="/listaProductos" element={<ListaProductos/>}/> 
          {/* Nueva ruta para el detalle del producto */}
        </Routes>
         <PieDePagina /> 
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

export default App;