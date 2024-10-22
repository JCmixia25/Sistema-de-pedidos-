import React, { useState } from 'react';
import { db } from '../conexion/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './InformacionPerfil.css';
import { useAuth } from "../context/authContext"; 
import { getAuth } from "firebase/auth";

const InformacionPerfil = () => {
  const navigate = useNavigate();
  const { setEstado2 } = useAuth(); 

  const [profileData, setProfileData] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    direccion: "",
    departamento: "",
    municipio: "",
    rol: "Cliente", // Rol por defecto
  });

  const [error, setError] = useState(""); // Estado para manejar el mensaje de error
  const [municipiosDisponibles, setMunicipiosDisponibles] = useState([]); // Lista dinámica de municipios

  const handleChange = ({ target: { name, value } }) => {
    setProfileData({ ...profileData, [name]: value });
    setError(""); // Limpiar el error al cambiar un campo

    if (name === "departamento") {
      // Actualizar la lista de municipios según el departamento seleccionado
      setMunicipiosDisponibles(municipiosPorDepartamento[value] || []);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { nombre, apellido, telefono, direccion, municipio, departamento } = profileData;

    if (!nombre || !apellido || !telefono || !direccion || !departamento || !municipio) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        setError("No hay usuario autenticado.");
        return;
      }

      await addDoc(collection(db, 'cuenta'), { ...profileData, usuario_uid: user.uid });
      console.log("Datos del perfil guardados:", profileData);

      await user.reload();

      if (!user.emailVerified) {
        setError("Por favor verifica tu correo antes de iniciar sesión.");
        return;
      }

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

  // Listado de departamentos y sus municipios
  const departamentos = [
    'Guatemala', 'Escuintla', 'Baja Verapaz', 'Alta Verapaz', 'Zacapa'
  ];

  const municipiosPorDepartamento = {
    'Guatemala': ['Mixco', 'Villa Nueva', 'Guatemala Ciudad'],
    'Escuintla': ['La Gomera', 'Santa Lucía Cotzumalguapa', 'Escuintla'],
    'Baja Verapaz': ['Salamá', 'Purulhá', 'San Jerónimo'],
    'Alta Verapaz': ['Cobán', 'San Pedro Carchá', 'Chisec'],
    'Zacapa': ['Zacapa', 'Teculután', 'Río Hondo'],
  };

  const isFormValid = () => {
    const { nombre, apellido, telefono, direccion, departamento, municipio } = profileData;
    return nombre && apellido && telefono && direccion && departamento && municipio;
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
          Departamento
          <select
            name="departamento"
            value={profileData.departamento}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona un Departamento</option>
            {departamentos.map((departamento) => (
              <option key={departamento} value={departamento}>{departamento}</option>
            ))}
          </select>
        </label>

        <label>
          Municipio
          <select
            name="municipio"
            value={profileData.municipio}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona un Municipio</option>
            {municipiosDisponibles.map((municipio) => (
              <option key={municipio} value={municipio}>{municipio}</option>
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
