import { Navigate } from 'react-router-dom';
import { useAuth } from "../context/authContext";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { datosUsuario } = useAuth(); // Obtener el usuario y el rol desde el contexto

  const userRol = datosUsuario?.[0]?.rol; // Asegúrate de que estás obteniendo el rol correctamente

  // Si el usuario no tiene un rol permitido, redirigir
  if (!allowedRoles.includes(userRol)) {
    return <Navigate to="/mensaje" replace />;
  }

  // Si el rol es válido, renderiza los hijos
  return children;
};

export default ProtectedRoute;



// import { Navigate, Route } from "react-router-dom";
// import Informacion from "../components-private/informacion";
// import Bienvenida from "../components/Bienvenida";
// import { useAuth } from "../context/authContext";



// export const ValidarRol = ({ children }) => {

//   const { estado, datosUsuario } = useAuth();


//   if (datosUsuario[0].rol === "Administrador") {
//     return (<Route path="/informacion" element={<Informacion />} />);
//   } else if (datosUsuario[0].rol === "Cliente") {
//     return ( <Route path="/inicio" element={<Bienvenida />} />)
//   }
// };

// export default ValidarRol;