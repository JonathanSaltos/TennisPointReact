import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

function PedidoDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pedido, setPedido] = useState(null);
  const [productos, setProductos] = useState({});

  useEffect(() => {
    // Obtener datos del pedido
    axios
      .get(`https://dsm-react-webapp-default-rtdb.europe-west1.firebasedatabase.app/pedidos/${id}.json`)
      .then((response) => {
        setPedido(response.data);
      });

   
  }, [id]);

 

  if (!pedido) return <p className="text-center mt-5">Cargando pedido...</p>;

  const items = pedido.items || {};
  
  

  return (
    <div className="container mt-4">
      <h2>Detalle del pedido</h2>
      <p><strong>Nombre:</strong> {pedido.nombre}</p>
      <p><strong>Email:</strong> {pedido.email}</p>
      <p><strong>Dirección:</strong> {pedido.direccion}</p>
      <p><strong>Fecha:</strong> {new Date(pedido.fecha).toLocaleString()}</p>
    </div>
  );
}

export default PedidoDetalle;
