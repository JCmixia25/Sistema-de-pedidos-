import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Botones } from "./components/Botones";
import Login from "./components/Login.js";
import Register from "./components/Register.js";
import Home from "./components/Home.js";
import Contacts from "./components/Contacts.js";
import icono from "./icono.jpeg";
import Bienvenida from "./components/Bienvenida.js"


import { AuthProvider } from "./context/authContext.js";

function App() {
  return (
    <div className="App">
      <img src={icono} alt="Icono" className="icono" />
      <Botones />
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bienvenida" element={<Bienvenida/>}/>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contacts />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
