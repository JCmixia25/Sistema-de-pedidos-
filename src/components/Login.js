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

  const [passwordVisible, setPasswordVisible] = useState(false);
  const { setEstado, login, setDatosUsuario } = useAuth();
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState("");

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userLogin = await login(user.email, user.password);

      if (userLogin) {
        const user = userLogin.user;

        // Verifica si el correo electrónico está verificado
        if (!user.emailVerified) {
          throw new Error("Por favor verifica tu correo electrónico antes de iniciar sesión.");
        }

        setEstado(true);
        localStorage.setItem("login", "true");
        setMensaje("");

        const refCuenta = collection(db, "cuenta");
        const q = query(refCuenta, where("usuario_uid", "==", user.uid));

        const snapshot = await getDocs(q);
        const doc = snapshot.docs[0];
        const datos = { ...doc.data(), id: doc.id };

        setDatosUsuario([datos]);
        console.log("datos del usuario: ", datos.rol);
        localStorage.setItem("rol", datos.rol);

        if (datos.rol === "Administrador") {
          navigate("/productos");
        } else if (datos.rol === "Cliente") {
          navigate("/inicio");
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
              type={passwordVisible ? "text" : "password"}
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
