import { createContext, useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../conexion/firebase";


export const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) throw new Error("No existe un proveedor de usuario");
  return context;
};

export function AuthProvider({ children }) {
  
  const [estado, setEstado] = useState(false);
  const [datosUsuario, setDatosUsuario] = useState([]);
  // const [carrito, setCarrito] = useState([]);

  const signup = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential;
    } catch (error) {
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      const userLogin = await signInWithEmailAndPassword(auth, email, password);
      return userLogin;
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    if (localStorage.getItem("login")) {
      setEstado(true);
    } else{
      setEstado(false);
    }
  }, []);


  return (
    <authContext.Provider value={{ signup, login, estado, setEstado, datosUsuario, setDatosUsuario}}>
      {children}
    </authContext.Provider>
  );
}