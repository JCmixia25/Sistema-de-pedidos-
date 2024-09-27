import React, { useEffect, useState } from "react";
import "./Login.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useAuth } from "../context/authContext";
import { NavLink, useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../conexion/firebase";

export function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  // Estado para controlar si la contraseña se muestra o no
  const [passwordVisible, setPasswordVisible] = useState(false);

  const { setEstado, login, datosUsuario, setDatosUsuario } = useAuth();
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState("");
  const usuario2 = new Object();

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Intento de iniciar sesión con Firebase Authentication
      const userLogin = await login(user.email, user.password);

      if (userLogin) {
        //Indica que la sesion está activa
        setEstado(true);
        //Almacena la sesion en una varible el navegador
        localStorage.setItem("login", "true");
        setMensaje("");

        //crea una referencia al documento cuenta
        const refCuenta = collection(db, "cuenta");

        //crear una consulta para obtener los datos de la cuenta del usuario
        const q = query(
          refCuenta,
          where("usuario_uid", "==", userLogin.user.uid)
        );

        const snapshot = await getDocs(q);
        const doc = snapshot.docs[0];
        //obtiene los datos del usuario
        const datos = { ...doc.data(), id: doc.id };

        //agrega los datos del usuario
        datosUsuario.push(datos);

        console.log("datos del usuario: ", datosUsuario[0].rol);
   
        localStorage.setItem("rol", datosUsuario[0].rol);
        

        if (datosUsuario[0].rol === "Administrador") {
          navigate("/productos");
        } else if (datosUsuario[0].rol === "Cliente") {
          navigate("/inicio");
        }
      }
    } catch (error) {
      // Manejo de errores de Firebase
      if (error.code === "auth/user-not-found") {
        setMensaje("Usuario no encontrado.");
      } else if (error.code === "auth/wrong-password") {
        setMensaje("Contraseña incorrecta.");
      } else {
        setMensaje("Error al iniciar sesión: " + error.message);
      }
    }
  };

  // Función para alternar la visibilidad de la contraseña
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="login-container">
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
          <div className="password-container">
            <input
              type={passwordVisible ? "text" : "password"} // Alterna entre 'text' y 'password'
              name="password"
              id="password"
              onChange={handleChange}
              placeholder="******"
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={togglePasswordVisibility}
            >
              <i
                className={passwordVisible ? "fas fa-eye-slash" : "fas fa-eye"}
              ></i>
            </button>
          </div>
        </label>

        <button type="submit" className="btn-ingresar">
          INGRESAR
        </button>


        {mensaje && <p className="mensaje">{mensaje}</p>}

        <div className="action-buttons">
          <NavLink className="btn-texto" to="/RestablecerPassword">
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
