import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Nombre:', name);
    console.log('Contraseña:', password);
    navigate('/home'); // Redirige al usuario a "Home"
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <label>
          Nombre

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ingrese su nombre"
            required
          />
        </label>
        <label>
          Contraseña
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingrese su contraseña"
            required
          />
        </label>
        <button type="submit">INGRESAR</button>
      </form>
    </div>
  );
}

export default Login;