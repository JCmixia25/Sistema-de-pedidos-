import React, { useState } from "react";
import "./Login.css"; // Asegúrate de que este archivo contenga los estilos correctos
import { useAuth } from "../context/authContext";
import { NavLink, useNavigate } from "react-router-dom";

export function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { setEstado, login } = useAuth();
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
        setEstado(true);
        localStorage.setItem("login", "true");
        setMensaje("");
        console.log(userLogin);
        navigate("/inicio");
      }
    } catch (error) {
      setMensaje(error.message);
    }
  };

  return (
    <div className="login-container"> {/* Cambié el nombre a 'login-form-container' */}
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
        <button type="submit" className="btn-ingresar">INGRESAR</button>
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