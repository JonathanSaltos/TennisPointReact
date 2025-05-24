import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Pedidos() {
    const [pedidos, setPedidos] = useState([]);
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('uid');

    useEffect(() => {
        if (!token || !userId) return;

        axios.get(`https://dsm-react-webapp-default-rtdb.europe-west1.firebasedatabase.app/pedidos.json?auth=${token}`)
            .then((response) => {
                const data = response.data;
                if (data) {
                    const lista = Object.entries(data)
                        .filter(([_, value]) => value.userId === userId)
                        .map(([id, value]) => ({
                            id,
                            ...value
                        }));
                        console.log("Pedidos recibidos:", lista);
                    setPedidos(lista);
                }
            })
            .catch((error) => {
                console.error("Error al obtener pedidos:", error);
            });
    }, [token, userId]);

    return (
        <div className="container mt-4">
            <h2>Pedidos realizados</h2>
            {pedidos.length === 0 ? (
                <p>No hay pedidos registrados.</p>
            ) : (
                <ul className="list-group">
                    {pedidos.map((pedido) => (
                        <li key={pedido.id} className="list-group-item d-flex justify-content-between">
                                         <strong>{pedido.nombre}</strong> - {pedido.email} <br />
        <small className="text-muted">ID: {pedido.id}</small>
                            <Link to={`/pedido/${pedido.id}`} className="btn btn-outline-primary btn-sm">Ver detalle pedido</Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Pedidos;