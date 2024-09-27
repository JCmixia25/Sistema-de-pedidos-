import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../conexion/firebase'; // Ajusta la ruta para que apunte a src/conexion/firebase.js

import "./RestablecerPassword.css";

const PasswordRecovery = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Enviar el correo de recuperación de contraseña
      await sendPasswordResetEmail(auth, email);
      setMessage(`Se ha enviado un correo de recuperación a ${email}`);
      setError(''); // Limpiar errores previos
    } catch (error) {
      setError('Error al enviar el correo de recuperación. Verifica tu correo electrónico.');
      setMessage('');
    }
  };

  return (
    <div className="recovery-container">
      <h2>Recuperación de Contraseña</h2>
      <form onSubmit={handleSubmit} className="recovery-form">
        <label htmlFor="email">Correo Electrónico:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Introduce tu correo electrónico"
          required
        />
        <button type="submit">Enviar</button>
      </form>
      {message && <p className="recovery-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default PasswordRecovery;
