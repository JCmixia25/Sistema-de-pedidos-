// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from '@firebase/firestore';
import { getStorage } from "firebase/storage";  // Importa Firebase Storage

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBIRbD7OBKA2vrAqd4Senj20b9_8QDn3l0",
  authDomain: "sistema-de-pedidos-1cad5.firebaseapp.com",
  projectId: "sistema-de-pedidos-1cad5",
  storageBucket: "sistema-de-pedidos-1cad5.appspot.com",
  messagingSenderId: "861701398085",
  appId: "1:861701398085:web:15de66966bab2a3d62cd2c",
  measurementId: "G-MLRLPR9YBY"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);  // Inicializa Firebase Storage
