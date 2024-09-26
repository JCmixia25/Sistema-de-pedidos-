// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";


import { getFirestore } from '@firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
export const auth = getAuth(app)

export const db = getFirestore(app)