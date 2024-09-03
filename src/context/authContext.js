import { createContext, useContext } from "react";
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../firebase';

export const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) throw new Error("No existe un proveedor de usuario");
  return context;
};

export function AuthProvider({ children }) {

  const signup = async (email, password) => {
    // console.log(email, password);
    try{
      createUserWithEmailAndPassword(auth, email, password);
      
    }catch(error){
      throw error;
    }
    
  };

  return (
    <authContext.Provider value={{ signup }}>{children}</authContext.Provider>
  );
}
