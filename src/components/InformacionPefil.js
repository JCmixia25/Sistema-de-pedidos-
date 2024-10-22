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
    correo: "",
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

  const departamentos = [
    'Guatemala', 'Escuintla', 'Baja Verapaz', 'Alta Verapaz', 'Zacapa', 
    'Chimaltenango', 'Chiquimula', 'El Progreso', 'Huehuetenango', 'Izabal', 
    'Jalapa', 'Jutiapa', 'Petén', 'Quetzaltenango', 'Quiché', 'Retalhuleu', 
    'Sacatepéquez', 'San Marcos', 'Santa Rosa', 'Sololá', 'Suchitepéquez', 
    'Totonicapán'
  ];
  
  const municipiosPorDepartamento = {
    'Guatemala': ['Mixco', 'Villa Nueva', 'Guatemala Ciudad', 'Villa Canales', 'San José Pinula', 'Amatitlán', 'Santa Catarina Pinula', 'Palencia', 'San Pedro Ayampuc', 'San Juan Sacatepéquez', 'San Miguel Petapa', 'Chinautla', 'Fraijanes', 'San Raymundo'],
    
    'Escuintla': ['Escuintla', 'La Gomera', 'Santa Lucía Cotzumalguapa', 'Puerto San José', 'Palín', 'Iztapa', 'Tiquisate', 'Nueva Concepción', 'Siquinalá', 'Masagua', 'San Vicente Pacaya', 'Guanagazapa'],
    
    'Baja Verapaz': ['Salamá', 'Purulhá', 'San Jerónimo', 'San Miguel Chicaj', 'Cubulco', 'Rabinal', 'Granados', 'El Chol'],
    
    'Alta Verapaz': ['Cobán', 'San Pedro Carchá', 'Chisec', 'San Cristóbal Verapaz', 'Tucurú', 'Santa Cruz Verapaz', 'Tactic', 'Fray Bartolomé de las Casas', 'Raxruhá', 'Senahú', 'Panzós', 'Cahabón', 'Santa María Cahabón', 'Chahal', 'Santa Catalina La Tinta', 'Tamahú', 'San Juan Chamelco'],
  
    'Zacapa': ['Zacapa', 'Teculután', 'Río Hondo', 'Gualán', 'La Unión', 'Huité', 'Usumatlán', 'Cabañas', 'San Jorge'],
  
    'Chimaltenango': ['Chimaltenango', 'San Juan Comalapa', 'San Martín Jilotepeque', 'San José Poaquil', 'Santa Apolonia', 'Tecpán Guatemala', 'Patzún', 'Pochuta', 'Patzicía', 'Santa Cruz Balanyá', 'Acatenango', 'Yepocapa', 'El Tejar', 'Parramos'],
    
    'Chiquimula': ['Chiquimula', 'Esquipulas', 'Concepción Las Minas', 'Quezaltepeque', 'San Jacinto', 'San José La Arada', 'Ipala', 'Olopa', 'Camotán', 'Jocotán'],
    
    'El Progreso': ['Guastatoya', 'Morazán', 'Sanarate', 'Sansare', 'El Jícaro', 'San Antonio La Paz', 'San Agustín Acasaguastlán', 'San Cristóbal Acasaguastlán'],
    
    'Huehuetenango': ['Huehuetenango', 'Santa Ana Huista', 'San Antonio Huista', 'San Sebastián Coatán', 'Todos Santos Cuchumatán', 'San Pedro Soloma', 'La Democracia', 'La Libertad', 'Colotenango', 'San Ildefonso Ixtahuacán', 'Santa Cruz Barillas', 'Santa Eulalia', 'San Rafael La Independencia', 'San Miguel Acatán', 'San Juan Atitán', 'San Sebastián Huehuetenango', 'Santiago Chimaltenango', 'San Mateo Ixtatán', 'San Gaspar Ixchil', 'Nentón', 'Jacaltenango', 'Cuilco', 'Chiantla', 'Malacatancito', 'San Juan Ixcoy'],
  
    'Izabal': ['Puerto Barrios', 'Livingston', 'El Estor', 'Morales', 'Los Amates'],
    
    'Jalapa': ['Jalapa', 'San Pedro Pinula', 'San Luis Jilotepeque', 'San Manuel Chaparrón', 'San Carlos Alzatate', 'Monjas', 'Mataquescuintla'],
    
    'Jutiapa': ['Jutiapa', 'El Progreso', 'Santa Catarina Mita', 'Agua Blanca', 'Asunción Mita', 'Yupiltepeque', 'Atescatempa', 'Jalpatagua', 'Comapa', 'Jerez', 'Conguaco', 'Moyuta', 'Pasaco', 'Quesada', 'San José Acatempa', 'Zapotitlán'],
    
    'Petén': ['Flores', 'San Benito', 'San Andrés', 'San José', 'Melchor de Mencos', 'Poptún', 'Santa Ana', 'San Luis', 'Sayaxché', 'Las Cruces', 'La Libertad', 'El Chal', 'Dolores'],
    
    'Quetzaltenango': ['Quetzaltenango', 'Salcajá', 'Olintepeque', 'San Carlos Sija', 'Sibilia', 'Cabricán', 'Cajolá', 'San Miguel Sigüilá', 'San Juan Ostuncalco', 'Concepción Chiquirichapa', 'San Martín Sacatepéquez', 'Almolonga', 'Cantel', 'Zunil', 'Colomba', 'El Palmar', 'Coatepeque', 'Flores Costa Cuca', 'Génova', 'Huitán', 'San Francisco La Unión'],
    
    'Quiché': ['Santa Cruz del Quiché', 'Joyabaj', 'Zacualpa', 'Chiché', 'Chinique', 'San Andrés Sajcabajá', 'San Bartolomé Jocotenango', 'Canillá', 'Chajul', 'Nebaj', 'Sacapulas', 'San Pedro Jocopilas', 'Uspantán', 'Pachalum', 'Chicamán', 'Cunén', 'San Juan Cotzal'],
    
    'Retalhuleu': ['Retalhuleu', 'Champerico', 'San Martín Zapotitlán', 'San Felipe Retalhuleu', 'San Andrés Villa Seca', 'Santa Cruz Muluá', 'Nuevo San Carlos', 'El Asintal'],
    
    'Sacatepéquez': ['Antigua Guatemala', 'Ciudad Vieja', 'Jocotenango', 'Pastores', 'Sumpango', 'Santo Domingo Xenacoj', 'Santiago Sacatepéquez', 'San Lucas Sacatepéquez', 'San Bartolomé Milpas Altas', 'San Antonio Aguas Calientes', 'Santa Catarina Barahona', 'Santa Lucía Milpas Altas', 'Magdalena Milpas Altas', 'San Juan Alotenango'],
    
    'San Marcos': ['San Marcos', 'Ayutla (Tecún Umán)', 'Catarina', 'Comitancillo', 'Concepción Tutuapa', 'El Quetzal', 'El Tumbador', 'Ixchiguán', 'La Reforma', 'Malacatán', 'Nuevo Progreso', 'Ocós', 'Pajapita', 'Río Blanco', 'San Antonio Sacatepéquez', 'San Cristóbal Cucho', 'San José Ojetenam', 'San Lorenzo', 'San Miguel Ixtahuacán', 'San Pablo', 'San Pedro Sacatepéquez', 'Sibinal', 'Sipacapa', 'Tacaná', 'Tajumulco', 'Tejutla'],
    
    'Santa Rosa': ['Cuilapa', 'Barberena', 'Chiquimulilla', 'Guazacapán', 'Nueva Santa Rosa', 'Oratorio', 'Pueblo Nuevo Viñas', 'San Juan Tecuaco', 'Santa Cruz Naranjo', 'Santa María Ixhuatán', 'Taxisco', 'Casillas', 'Santa Rosa de Lima', 'San Rafael Las Flores'],
    
    'Sololá': ['Sololá', 'San José Chacayá', 'Santa María Visitación', 'Santa Lucía Utatlán', 'Nahualá', 'Panajachel', 'San Andrés Semetabaj', 'San Antonio Palopó', 'San Juan La Laguna', 'San Lucas Tolimán', 'San Marcos La Laguna', 'Santa Catarina Palopó', 'Santa Clara La Laguna', 'Santa Cruz La Laguna', 'Santa Lucía Utatlán', 'Santiago Atitlán'],
    
    'Suchitepéquez': ['Mazatenango', 'San Francisco Zapotitlán', 'San Bernardino', 'San José El Ídolo', 'Santo Domingo Suchitepéquez', 'Patulul', 'Santa Bárbara', 'San Juan Bautista', 'San Lorenzo', 'San Miguel Panán', 'Samayac', 'Chicacao', 'Zunilito', 'Cuyotenango', 'Pueblo Nuevo', 'Río Bravo', 'Santo Tomás La Unión'],
    
    'Totonicapán': ['Totonicapán', 'San Cristóbal Totonicapán', 'San Francisco El Alto', 'San Andrés Xecul', 'Momostenango', 'Santa Lucía La Reforma', 'Santa María Chiquimula', 'San Bartolo Aguas Calientes']
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
