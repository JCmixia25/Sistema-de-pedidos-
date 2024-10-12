import React, { useState, useEffect } from 'react';
import '../components-Administrador/ControlPedidos.css';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../conexion/firebase.js"; // Tu conexión a Firebase

const ControlPedidos = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        // Función para obtener pedidos de Firebase
        const fetchOrders = async () => {
            const pedidosRef = collection(db, "pedidos");
            const snapshot = await getDocs(pedidosRef);
            const ordersData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setOrders(ordersData);
        };

        fetchOrders(); // Llamar a la función para cargar los pedidos
    }, []);

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
                                <td>{order.fecha}</td>
                                <td>{order.estado}</td>
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
