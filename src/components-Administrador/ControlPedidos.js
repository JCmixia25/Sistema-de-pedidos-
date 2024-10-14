import React, { useState, useEffect } from 'react';
import '../components-Administrador/ControlPedidos.css';
import { collection, getDocs, doc, updateDoc, Timestamp } from "firebase/firestore"; // Importa Timestamp
import { db } from "../conexion/firebase.js"; // Tu conexión a Firebase

const ControlPedidos = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        // Función para obtener pedidos de Firebase
        const fetchOrders = async () => {
            const pedidosRef = collection(db, "pedidos");
            const snapshot = await getDocs(pedidosRef);
            const ordersData = snapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    id: doc.id,
                    ...data,
                    fecha: data.fecha instanceof Timestamp ? data.fecha.toDate() : data.fecha // Verifica si es Timestamp
                };
            });

            // Ordenar los pedidos por fecha (del más reciente al más antiguo)
            const sortedOrders = ordersData.sort((a, b) => {
                return new Date(b.fecha) - new Date(a.fecha); // Asegúrate de que sean objetos Date
            });

            setOrders(sortedOrders);
        };

        fetchOrders(); // Llamar a la función para cargar los pedidos
    }, []);

    // Función para cambiar el estado de un pedido
    const cambiarEstadoPedido = async (id, estadoActual) => {
        // Nuevo estado basado en el estado actual
        const nuevoEstado = estadoActual === "Pendiente" ? "Enviado" : "Pendiente";

        try {
            // Actualizar el estado en Firebase
            const pedidoDocRef = doc(db, "pedidos", id);
            await updateDoc(pedidoDocRef, { estado: nuevoEstado });

            // Actualizar el estado localmente en la lista de pedidos
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.id === id ? { ...order, estado: nuevoEstado } : order
                )
            );
        } catch (error) {
            console.error("Error al actualizar el estado del pedido:", error);
        }
    };

    return (
        <div className="control-pedidos">
            <h1>Control de Pedidos</h1>

            <div className="order-list">
                <h2>Lista de Pedidos</h2>
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
                        {orders.map((order) => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.cliente.nombres} {order.cliente.apellidos}</td>
                                <td>{order.fecha.toString()}</td>
                                <td>
                                    {/* Botón con estado condicional y colores */}
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
