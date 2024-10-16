import React, { useState, useEffect } from 'react';
import '../components-Administrador/ControlPedidos.css';
import { collection, getDocs, doc, updateDoc, Timestamp, orderBy, query } from "firebase/firestore";
import { db } from "../conexion/firebase.js"; 
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importa los íconos de react-icons

const ControlPedidos = () => {
    const [orders, setOrders] = useState([]);
    const [mostrandoPendientes, setMostrandoPendientes] = useState(true); // Estado para alternar entre pendientes y enviados

    useEffect(() => {
        // Función para obtener pedidos de Firebase
        const fetchOrders = async () => {
            const pedidosRef = collection(db, "pedidos");
    
            // Ordenar los pedidos por fecha (del más reciente al más antiguo)
            const snapshot = await getDocs(query(pedidosRef, orderBy("fecha", "desc")));
            
            const ordersData = snapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    id: doc.id,
                    ...data,
                    fecha: data.fecha instanceof Timestamp ? data.fecha.toDate() : data.fecha
                };
            });
    
            setOrders(ordersData);
        };
    
        fetchOrders(); // Llamar a la función para cargar los pedidos
    }, []);
    
   

    // Función para cambiar el estado de un pedido
    const cambiarEstadoPedido = async (id, estadoActual) => {
        const nuevoEstado = estadoActual === "Pendiente" ? "Enviado" : "Pendiente";

        try {
            const pedidoDocRef = doc(db, "pedidos", id);
            await updateDoc(pedidoDocRef, { estado: nuevoEstado });

            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.id === id ? { ...order, estado: nuevoEstado } : order
                )
            );
        } catch (error) {
            console.error("Error al actualizar el estado del pedido:", error);
        }
    };

    // Filtrar los pedidos según el estado que se quiera mostrar (Pendientes o Enviados)
    const pedidosFiltrados = orders.filter((order) => 
        mostrandoPendientes ? order.estado === "Pendiente" : order.estado === "Enviado"
    );

    return (
        <div className="control-pedidos">
            <h1>Control de Pedidos</h1>

            {/* Botón para alternar entre ver Pendientes y Enviados */}
            <div className="toggle-view">
                <button 
                    className="btn-toggle" 
                    onClick={() => setMostrandoPendientes(!mostrandoPendientes)}
                >
                    {/* Renderiza el ícono basado en el estado actual */}
                    {mostrandoPendientes ? <FaEye /> : <FaEyeSlash />}
                    {mostrandoPendientes ? " Ver Enviados" : " Ver Pendientes"}
                </button>
            </div>

            <div className="order-list">
                <h2>{mostrandoPendientes ? "Pedidos Pendientes" : "Pedidos Enviados"}</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Cliente</th>
                            <th>Fecha</th>
                            <th>Estado</th>
                            <th>Ver PDF</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pedidosFiltrados.map((order) => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.cliente.nombres} {order.cliente.apellidos}</td>
                                <td>{order.fecha.toString()}</td>
                                <td>
                                    <button
                                        className={`btn-estado ${order.estado === "Pendiente" ? 'pendiente' : 'enviado'}`}
                                        onClick={() => cambiarEstadoPedido(order.id, order.estado)}
                                    >
                                        {order.estado}
                                    </button>
                                </td>
                                <td>
                                    {order.pdfUrl ? (
                                        <button 
                                            className="btn-pdf" 
                                            onClick={() => window.open(order.pdfUrl, '_blank')}
                                        >
                                            Ver PDF
                                        </button>
                                    ) : (
                                        "No disponible"
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ControlPedidos;
