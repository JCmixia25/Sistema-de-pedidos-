import React, { useState } from 'react';
import { db } from '../conexion/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './InformacionPerfil.css';
import { useAuth } from "../context/authContext"; 
import { getAuth } from "firebase/auth";

const InformacionPerfil = () => {
  const navigate = useNavigate();
  const {setEstado2 } = useAuth(); 

  const [profileData, setProfileData] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    direccion: "",
    pais: "",
    departamento: "",
    rol: "Cliente", // Rol por defecto
  });

  const [error, setError] = useState(""); // Estado para manejar el mensaje de error

  const handleChange = ({ target: { name, value } }) => {
    setProfileData({ ...profileData, [name]: value });
    setError(""); // Limpiar el error al cambiar un campo
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar si todos los campos están llenos
    const { nombre, apellido, telefono, direccion, pais, departamento } = profileData;

    if (!nombre || !apellido || !telefono || !direccion || !pais || !departamento) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    try {
      // Obtener el uid del usuario autenticado
      const auth = getAuth();
      const user = auth.currentUser;

      // Asegurarse de que el usuario esté autenticado
      if (!user) {
        setError("No hay usuario autenticado.");
        return;
      }

      // Agregar el perfil a Firebase
      await addDoc(collection(db, 'cuenta'), { ...profileData, usuario_uid: user.uid }); // Incluye el uid
      console.log("Datos del perfil guardados:", profileData);

       // Recargar el estado del usuario para obtener los últimos cambios
    await user.reload();

      // Verificar si el correo ha sido verificado
      if (!user.emailVerified) {
        setError("Por favor verifica tu correo antes de iniciar sesión.");
        return;
      }

      
      // Redirigir según el rol del usuario
      if (profileData.rol === "Administrador") {
        console.log("Redirigiendo a inicio");
        navigate("/inicio");
      } else if (profileData.rol === "Cliente") {
        console.log("Redirigiendo a productos");
        setEstado2(true);
        localStorage.setItem("rol", "Cliente");
        navigate("/productos");


      }

    } catch (error) {
      console.error("Error al guardar los datos del perfil:", error);
      setError("Error al guardar la información. Inténtalo de nuevo.");
    }

  };

  const paises = [
    'Argentina',
    'Brasil',
    'Chile',
    'Colombia',
    'México'
  ];

  const departamentos = [
    'Ventas',
    'Marketing',
    'Recursos Humanos',
    'Tecnología',
    'Finanzas'
  ];

  const isFormValid = () => {
    const { nombre, apellido, telefono, direccion, pais, departamento } = profileData;
    return nombre && apellido && telefono && direccion && pais && departamento;
  };

  return (
    <div className="informacion-perfil-container">
      <h1>Información del Perfil</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Nombre
          <input
            type="text"
            name="nombre"
            value={profileData.nombre}
            onChange={handleChange}
            required
          />
        </label>
        
        <label>
          Apellido
          <input
            type="text"
            name="apellido"
            value={profileData.apellido}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Teléfono
          <input
            type="tel"
            name="telefono"
            value={profileData.telefono}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Dirección
          <input
            type="text"
            name="direccion"
            value={profileData.direccion}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          País
          <select
            name="pais"
            value={profileData.pais}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona un país</option>
            {paises.map((pais) => (
              <option key={pais} value={pais}>{pais}</option>
            ))}
          </select>
        </label>

        <label>
          Departamento
          <select
            name="departamento"
            value={profileData.departamento}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona un departamento</option>
            {departamentos.map((dep) => (
              <option key={dep} value={dep}>{dep}</option>
            ))}
          </select>
        </label>

        <button type="submit" disabled={!isFormValid()}>
          Guardar Información
        </button>
      </form>
    </div>
  );

};

export default InformacionPerfil;
