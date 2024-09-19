import { createContext, useContext, useState, useEffect } from "react";


// // export const authContext = createContext();
export const CartContext = createContext();

// export const useAuth = () => {
//   const context = useContext(CartContext);
//   if (!context) throw new Error("No existe un proveedor de carrito");
//   return context;
// };

// export function AuthProvider({ children }) {
//   const [estado, setEstado] = useState(false);

//   return (
//     <CartContext.Provider value={{ estado, setEstado }}>
//       {children}
//     </CartContext.Provider>
//   );
// }
