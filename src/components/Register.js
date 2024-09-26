import React, { useState, useRef } from "react";
import "./Register.css";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

export function Register() {
  const [passwordError, setPasswordError] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
    password2: "",
  });

  const { signup } = useAuth();
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState("");
  
  // Estados para controlar la visibilidad de las contraseñas
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password2Visible, setPassword2Visible] = useState(false);
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  
  // Crear una referencia para el reCAPTCHA
  const recaptchaRef = useRef();

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.password2 !== user.password) {
      setPasswordError(true);
      return;
    }

    if (!recaptchaValue) {
      setMensaje("Por favor verifica que no eres un robot.");
      return;
    }

    setPasswordError(false);
    try {
      const userCredential = await signup(user.email, user.password);
      if (userCredential) {
        setMensaje("");
        console.log("Usuario registrado con éxito");
        navigate("/Login");
      }
    } catch (error) {
      setMensaje(error.message);
    } finally {
      // Reiniciar el reCAPTCHA después de enviar el formulario
      recaptchaRef.current.reset();
      setRecaptchaValue(null); // Reiniciar el valor del reCAPTCHA
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const togglePassword2Visibility = () => {
    setPassword2Visible(!password2Visible);
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit}>
        <label>
          Correo electrónico
          <input
            type="email"
            name="email"
            onChange={handleChange}
            placeholder="ejemplo@gmail.com"
            required
          />
        </label>
        <label>
          Contraseña
          <div className="password-container">
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              onChange={handleChange}
              placeholder="******"
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={togglePasswordVisibility}
            >
              <i className={passwordVisible ? "fas fa-eye-slash" : "fas fa-eye"}></i>
            </button>
          </div>
        </label>
        <label>
          Confirmar Contraseña
          <div className="password-container">
            <input
              type={password2Visible ? "text" : "password"}
              name="password2"
              onChange={handleChange}
              placeholder="******"
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={togglePassword2Visibility}
            >
              <i className={password2Visible ? "fas fa-eye-slash" : "fas fa-eye"}></i>
            </button>
          </div>
        </label>
        {passwordError && (
          <div className="password-error">Las contraseñas no coinciden.</div>
        )}
        <ReCAPTCHA
          ref={recaptchaRef} // Asignar la referencia aquí
          sitekey="6Lcl404qAAAAAKQaBFljoNfOIIjA-kOXVPTaIVBJ" // Reemplaza con tu Site Key
          onChange={(value) => setRecaptchaValue(value)}
        />
        <button type="submit">REGISTRARSE</button>
        {mensaje && <p className="mensaje">{mensaje}</p>}
      </form>
    </div>
  );
}

//hola mundo
export default Register;
