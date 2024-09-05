import React, { useState } from "react";
import "./Register.css";
import icono from "./icono.jpeg";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
// import { signOut } from "firebase/auth";

export function Register() {
  // const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(true);

  const [user, setUser] = useState({
    email: "",
    password: "",
    password2: "",
  });

  const {signup } = useAuth();

  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState("");

  const handleChange = ({ target: { name, value } }) => {
    // console.log(name, value);
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(user.email, user.password);

    //Validar que las contraseñas coincidan
    if (user.password2 !== user.password) {
      setPasswordError(true);
      return;
    } else {

      setPasswordError(false);

      try {
        const userCredential = await signup(user.email, user.password);
        if (userCredential) {
          // Usuario creado exitosamente
          setMensaje("");
          console.log("Usuario registrado con éxito");
          navigate("/Login");
          // Redireccionar al usuario o realizar otras acciones
        }
      } catch (error) {
        setMensaje(error.message);
      }
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
        <label>
          Confirmar Contraseña
          <input
            type="password"
            name="password2"
            id="password2"
            onChange={handleChange}
            placeholder="******"
            required
          />
        </label>
        {passwordError && (
          <div className="password-error">Las contraseñas no coinciden.</div>
        )}
        <button type="submit">REGISTRARSE</button>
        {mensaje && <p className="mensaje">{mensaje}</p>}
      </form>
    </div>
  );
}

export default Register;
