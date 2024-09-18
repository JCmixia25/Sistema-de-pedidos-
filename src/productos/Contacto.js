import React, { useState } from "react";
import { useForm } from "react-hook-form";

const Contacto = () => {

    const {register, handleSubmit } = useForm();
    
    const enviar = (data) =>{
        console.log(data);
    }

  return (
    <div>
      <h1>Contacto</h1>
      <form onSubmit={handleSubmit(enviar)}>
        <input type="text" placeholder="Ingresa tu nombre" {...register("nombre")}/>
        <input type="email" placeholder="Ingresa tu e-mail" {...register("email")}/>
        <input type="phone" placeholder="Ingresa tu número" {...register("telefono")}/>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Contacto;
