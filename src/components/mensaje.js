import React from 'react';
import { Link } from 'react-router-dom';

const RequiereAdmin = () => {
  return (
    <div className="container">
      <h1>Ruta no autorizada</h1>
      <p>Esta ruta requiere credenciales de administrador.</p>
      
      <Link to="/">Volver al menú principal</Link>
    </div>
  );
};

export default RequiereAdmin;
