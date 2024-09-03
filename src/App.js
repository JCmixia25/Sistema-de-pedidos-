import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Botones } from "./components/Botones";
import Login from "./components/Login.js";
import Register from "./components/Register.js";
import Home from "./components/Home.js";
import Contacts from "./components/Contacts.js";
import ProductDetail from "./components/ProductDetail"; // Importa el componente
import icono from './icono.jpeg'; 

function App() {
  return (
    <div className="App">
      <img src={icono} alt="Icono" className="icono" /> 
      <Botones />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contacts />} />
        <Route path="/home/:id" element={<ProductDetail />} /> {/* Nueva ruta para el detalle del producto */}
      </Routes>
    </div>
  );
}

export default App;