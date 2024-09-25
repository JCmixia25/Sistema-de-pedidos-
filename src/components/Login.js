import React, { useState } from "react";
import "./Login.css"; // Asegúrate de que este archivo contenga los estilos correctos
import { useAuth } from "../context/authContext";
import { NavLink, useNavigate } from "react-router-dom";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../conexion/firebase";

export function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { setEstado, login, datosUsuario, setDatosUsuario } = useAuth();
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState("");
  

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Codigo para iniciar sesion
    try {
      const userLogin = await login(user.email, user.password);
      if (userLogin) {
        setEstado(true);
        localStorage.setItem("login", "true");
        setMensaje("");
        console.log("usuario: ", userLogin.user.uid);

        //Consultar rol de usuario
        
        const refCuenta = collection(db, "cuenta");
        const q = query(
          refCuenta,
          where("usuario_uid", "==", userLogin.user.uid)
        );
        const snapshot = await getDocs(q);
        const doc = snapshot.docs[0];
         
        const datos = { ...doc.data(), id: doc.id };

         setDatosUsuario(datos);
        
        console.log("datos usuario: ", datosUsuario);

        //valida el rol
        if (datos.rol === "Administrador") {
          console.log("Bienvenido administrador");
          navigate("/productos");
        } else if(datos.rol === "Cliente"){
          console.log("Bienvenido cliente");
          navigate("/inicio");
        }

      }
    } catch (error) {
      setMensaje(error.message);
    }
  };

  return (
    <div className="login-container">
      {" "}
      {/* Cambié el nombre a 'login-form-container' */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          Correo electrónico
          <input
            type="email"
            name="email"
            id="email"
            onChange={handleChange}
            placeholder="ejemplo@gmail.com"
            required
          />
        </label>
        <label htmlFor="password">
          Contraseña
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
            placeholder="******"
            required
          />
        </label>
        <button type="submit" className="btn-ingresar">
          INGRESAR
        </button>
        {mensaje && <p className="mensaje">{mensaje}</p>}

        <div class="action-buttons">
          <NavLink className="btn-texto" to="/">
            ¿Olvidaste tu Contraseña?
          </NavLink>
          <NavLink className="btn-texto" to="/register">
            ¿No tienes cuenta?
          </NavLink>
        </div>
      </form>
    </div>
  );
}

export default Login;
