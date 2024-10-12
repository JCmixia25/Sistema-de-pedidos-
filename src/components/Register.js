import React, { useState, useRef } from "react";
import "./Register.css";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { sendEmailVerification } from "firebase/auth"; 

export function Register() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    password2: "",
  });
  const [passwordError, setPasswordError] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const recaptchaRef = useRef();
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false); // Control de visibilidad de contraseña
  const { signup } = useAuth();
  const navigate = useNavigate();

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
        const user = userCredential.user;
        await sendEmailVerification(user); 

        setMensaje("Registro exitoso. Por favor, verifica tu correo electrónico.");
        console.log("Usuario registrado con éxito");
        navigate("/Login");
      }
    } catch (error) {
      setMensaje(error.message);
    } finally {
      recaptchaRef.current.reset();
      setRecaptchaValue(null);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible); // Alterna la visibilidad de la contraseña
  };

  return (
    <div className="register-container">
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

        <label htmlFor="password2">
          Repetir Contraseña
          <div className="password-container">
            <input
              type={passwordVisible ? "text" : "password"}
              name="password2"
              id="password2"
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

        {passwordError && <p className="error">Las contraseñas no coinciden.</p>}
        {mensaje && <p className="mensaje">{mensaje}</p>}

        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey="6Lcl404qAAAAAKQaBFljoNfOIIjA-kOXVPTaIVBJ"
          onChange={setRecaptchaValue}
        />

        <button type="submit" className="btn-registrar">
          REGISTRAR
        </button>
      </form>
    </div>
  );
}

export default Register;
