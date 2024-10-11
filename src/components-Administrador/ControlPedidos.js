import React, { useState } from 'react';
import '../components-Administrador/ControlPedidos.css';

const ControlPedidos = () => {
    const [orders, setOrders] = useState([]);
    const [product, setProduct] = useState('');
    const [quantity, setQuantity] = useState('');

    const addOrder = (e) => {
        e.preventDefault();
        if (product && quantity) {
            const newOrder = {
                id: Date.now(),
                product,
                quantity,
                date: new Date().toLocaleString(), // Agregar la fecha actual
                status: 'Pendiente',
            };
            setOrders([...orders, newOrder]);
            setProduct('');
            setQuantity('');
        }
    };

    return (
        <div className="control-pedidos">
            <h1>Control de Pedidos</h1>
            <form onSubmit={addOrder} className="order-form">
                <input
                    type="text"
                    placeholder="Producto"
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Cantidad"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                />
                <button type="submit">Agregar Pedido</button>
            </form>
            <div className="order-list">
                <h2>Lista de Pedidos</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>Fecha</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.product}</td>
                                <td>{order.quantity}</td>
                                <td>{order.date}</td>
                                <td>{order.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ControlPedidos;