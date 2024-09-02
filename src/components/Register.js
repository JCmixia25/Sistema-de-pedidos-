import React, { useState } from "react";
import "./Register.css";
import icono from "./icono.jpeg";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

export function Register() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { signup } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState();

  const handleChange = ({ target: { name, value } }) => {
    // console.log(name, value);
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(user.email, user.password);
    try {
      await signup(user.email, user.password);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="register-container">
      {error && <p>error</p>}
      <img src={icono} alt="Icono" className="icono" />
      <form onSubmit={handleSubmit}>
        <label>
          Correo electrónico
          <input
            type="email"
            name="email"
            onChange={handleChange}
            placeholder="ejemplo.@mail.com"
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
            required
          />
        </label>
        <button type="submit">REGISTRARSE</button>
      </form>
    </div>
  );
}

export default Register;
