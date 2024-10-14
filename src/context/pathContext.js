// import { createContext, useContext, useState, useEffect } from "react";
// import { auth } from "../conexion/firebase";

// export const pathContext = createContext();

// export const patAuth = () => {
//   const context = useContext(pathContext)
//   if (!context) throw new Error("No existe un proveedor de usuario");
//   return context;
// };

// export function AuthProvider({ children }) {

//   const [producto_id, setProductoId] = useState("");

//   return (
//     <pathContext.Provider value={{ producto_id, setProductoId }}>
//       {children}
//     </pathContext.Provider>
//   );
// }