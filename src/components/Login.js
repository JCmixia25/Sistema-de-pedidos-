import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
// import icono from "/icono.jpeg";




function Login() {

  // const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Correo:', email);
    console.log('Contraseña:', password);
    navigate('/home'); // Redirige al usuario a "Home"
  };

  return (
    <div className="login-container">
      {/* <h2>INICIAR SESIÓN</h2> */}
      {/* <div className="login-image">
        <img src={icono} alt="Icono" />
      </div> */}
      <form onSubmit={handleSubmit}>
        <label>
          Correo
          <input
            type="email"
            // value={name}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ingrese su correo"
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