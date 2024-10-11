import React, { useState } from "react";
import "./Login.css";
import { useAuth } from "../context/authContext"; // Asegúrate de que la ruta sea correcta
import { NavLink, useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../conexion/firebase";

// Importar los componentes de Cliente
import { Encabezado } from '../components-Cliente/Encabezado';
import Informacion from '../components-Cliente/informacion';

// Importar el componente de Administrador
import AgregarPro from '../components-Administrador/agregarpro';
import { EncabezadoAdmin } from '../components-Administrador/EncabezadoAdmin';

export function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { setEstado, login, setDatosUsuario } = useAuth(); // Asegúrate de incluir setDatosUsuario
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState("");
  const [rol, setRol] = useState(localStorage.getItem("rol")); // Manejar el rol en el estado

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Limpiar localStorage antes de iniciar sesión para que no guarde Rol Anterior
    localStorage.removeItem("rol");
    localStorage.removeItem("login");

    try {
      const userLogin = await login(user.email, user.password);

      if (userLogin) {
        setEstado(true);
        localStorage.setItem("login", "true");
        setMensaje("");

        const refCuenta = collection(db, "cuenta");
        const q = query(refCuenta, where("usuario_uid", "==", userLogin.user.uid));
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
          const doc = snapshot.docs[0];
          const datos = { ...doc.data(), id: doc.id };

          console.log("Datos del usuario:", datos);
          setDatosUsuario([datos]); // Usar setDatosUsuario para actualizar el estado
          localStorage.setItem("rol", datos.rol);
          setRol(datos.rol);

          if (datos.rol === "Administrador") {
            console.log("Redirigiendo a inicio");
            navigate("/inicio");
          } else if (datos.rol === "Cliente") {
            console.log("Redirigiendo a productos");
            navigate("/productos");
          }
        } else {
          console.log("No se encontraron datos para el usuario.");
        }
      }
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setMensaje("Usuario no encontrado.");
      } else if (error.code === "auth/wrong-password") {
        setMensaje("Contraseña incorrecta.");
      } else {
        setMensaje("Error al iniciar sesión: " + error.message);
      }
    }
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
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
            placeholder="******"
            required
          />
        </label>

        <button type="submit" className="btn-ingresar" >
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

      {/* Renderizar encabezados según el rol */}
      {rol === "Cliente" && (
        <>
          <Encabezado />
          <Informacion />
        </>
      )}

      {rol === "Administrador" && (
        <>
          <EncabezadoAdmin />
          <AgregarPro />
        </>
      )}
    </div>
  );
}

export default Login;