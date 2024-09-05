import React, { useState } from "react";
import "./Register.css";
import "../../src/index";
import icono from "./icono.jpeg";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";


export function Register() {

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
        setMensaje("");
        console.log(userLogin);
        navigate("/home");
      }
    } catch (error) {
      setMensaje(error.message);
    }
  };

  return (
    <div className="register-container">
      <img src={icono} alt="Icono" className="icono" />
      <form onSubmit={handleSubmit}>
        <label>
          Correo electrónico
          <input
            type="email"
            name="email"
            onChange={handleChange}
            placeholder="ejemplo.@gmail.com"
            required
          />
        </label>
        <label>
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
        <button type="submit">INGRESAR</button>
        {mensaje && <p className="mensaje">{mensaje}</p>}
      </form>
    </div>
  );
}

export default Register;
