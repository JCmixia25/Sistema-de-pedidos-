import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import inicio from './inicio.jpeg';
import icono from './icono.jpeg';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      setPasswordError(true);
      return;
    }

    // Aquí puedes agregar la lógica para registrar al usuario
    console.log('Nombre:', name);
    console.log('Correo:', email);
    console.log('Contraseña:', password);
    navigate('/home'); // Redirige al usuario a la página de inicio
  };

  return (
    <div className="register-container">
      <img src={icono} alt="Icono" className="icono" />
      <h2>REGISTRO DE USUARIO</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Correo electrónico
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Contraseña
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Confirmar Contraseña
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {passwordError && (
          <div className="password-error">Las contraseñas no coinciden.</div>
        )}
        <button type="submit">REGISTRARSE</button>
      </form>
    </div>
  );
}

export default Register;