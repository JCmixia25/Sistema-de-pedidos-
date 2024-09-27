import { Navigate, Route } from "react-router-dom";
import Informacion from "../components-private/informacion";
import Bienvenida from "../components/Bienvenida";


export const ValidarRol = ({ children, rol }) => {
  if (rol === "Administrador") {
    return <Route path="/informacion" element={<Informacion />} />;
  } else if (rol === "Cliente") {
    return   <Route path="/inicio" element={<Bienvenida />} />
  }
};
