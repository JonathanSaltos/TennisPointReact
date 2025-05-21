import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Pedidos() {
    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
        axios.get('https://dsm-react-webapp-default-rtdb.europe-west1.firebasedatabase.app/pedidos.json')
            .then((response) => {
                const data = response.data;
                if (data) {
                    const lista = Object.entries(data).map(([id, value]) => ({
                        id,
                        ...value
                    }));
                    setPedidos(lista);
                }
            });
    }, []);

    return (
        <div className="container mt-4">
            <h2>Pedidos realizados</h2>
            {pedidos.length === 0 ? (
                <p>No hay pedidos registrados.</p>
            ) : (
                <ul className="list-group">
                    {pedidos.map((pedido) => (
                        <li key={pedido.id} className="list-group-item d-flex justify-content-between">
                            <span><strong>{pedido.nombre}</strong> - {pedido.email}</span>
                            <Link to={`/pedido/${pedido.id}`} className="btn btn-outline-primary btn-sm">Ver detalle pedido</Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Pedidos;
