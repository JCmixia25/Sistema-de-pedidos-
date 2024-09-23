import ReactDOM from "react-dom/client";
import "./index.css";
import App from "../src/App.js";
import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/authContext.js";


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
      
    <BrowserRouter>
      <AuthProvider>
        <App/>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
