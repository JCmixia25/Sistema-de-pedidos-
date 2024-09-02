// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXkE2dqu9iHVvxpq4jR4uu6BlZStbcY5E",
  authDomain: "sistema-de-ventas-8d48a.firebaseapp.com",
  projectId: "sistema-de-ventas-8d48a",
  storageBucket: "sistema-de-ventas-8d48a.appspot.com",
  messagingSenderId: "988408325977",
  appId: "1:988408325977:web:96fd6ba9cbd7db666c8e48",
  measurementId: "G-KMMJW251R8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

export const auth = getAuth (app)