import React, { useState } from "react";
import { useForm } from "react-hook-form";

const Contacto = () => {

    const {register, handleSubmit } = useForm();
    
    const enviar = (data) =>{
        console.log(data);
    }

//   const [nombre, setNombre] = useState("");
//   const [email, setEmail] = useState("");

//#2
//   const [valores, setValores] = useState({
//     nombre: "",
//     email: "",
//     telefono: "",
//   });

//#2
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Enviado", valores);
//   };

//#1
  // const handleNombre = (e) => {
  //     setNombre(e.target.value);
  //     console.log(e.target.value)
  // }
//#1
  // const handleEmail = (e) => {
  //     setEmail(e.target.value)
  //     console.log(e.target.value)
  // }


// #2
//   const handleValores = (e) => {
//     setValores({
//       ...valores,
//       [e.target.name]: e.target.value,
//     });
//   };

  return (
    <div>
      <h1>Contacto</h1>
      <form onSubmit={handleSubmit(enviar)}>
        <input type="text" placeholder="Ingresa tu nombre" {...register("nombre")}/>
        <input type="email" placeholder="Ingresa tu e-mail" {...register("email")}/>
        <input type="phone" placeholder="Ingresa tu número" {...register("telefono")}/>
        {/* <input 
                    type="text"
                    placeholder="Ingresa tu nombre"
                    value={valores.nombre}
                    // onChange={handleNombre}
                    onChange={handleValores}
                    name="nombre"
                />
                <input 
                    type="email"
                    placeholder="Ingresa tu e-mail"
                    value={valores.email}
                    // onChange={handleEmail}
                    onChange={handleValores}
                    name="email"
                />
                <input 
                    type="phone"
                    placeholder="Ingresa tu número"
                    value={valores.telefono}
                    // onChange={handleEmail}
                    onChange={handleValores}
                    name="telefono"
                /> */}
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Contacto;
