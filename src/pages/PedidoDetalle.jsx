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
    axios
      .get(`https://dsm-react-webapp-default-rtdb.europe-west1.firebasedatabase.app/pedidos/${id}.json`)
      .then((response) => {
        setPedido(response.data);
      });

    axios
      .get(`https://dsm-react-webapp-default-rtdb.europe-west1.firebasedatabase.app/productos.json`)
      .then((res) => {
        setProductos(res.data || {});
      });
  }, [id]);

  const borrarPedido = () => {
    if (window.confirm("¿Seguro que deseas eliminar este pedido?")) {
      axios
        .delete(`https://dsm-react-webapp-default-rtdb.europe-west1.firebasedatabase.app/pedidos/${id}.json`)
        .then(() => {
          alert("Pedido eliminado");
          navigate("/pedidos");
        });
    }
  };

  if (!pedido) return <p className="text-center mt-5">Cargando pedido...</p>;

  const items = pedido.items || {};

  const calcularSubtotal = (id, cantidad) => {
    const precio = parseFloat(productos[id]?.Precio || 0);
    return (cantidad * precio).toFixed(2);
  };

  const calcularTotal = () => {
    return Object.entries(items)
      .filter(([_, cantidad]) => cantidad > 0)
      .reduce((total, [id, cantidad]) => {
        const precio = parseFloat(productos[id]?.Precio || 0);
        return total + cantidad * precio;
      }, 0)
      .toFixed(2);
  };

  return (
    <div className="container mt-4">
      <h2>Detalle del pedido</h2>
      <p><strong>Nombre:</strong> {pedido.nombre}</p>
      <p><strong>Email:</strong> {pedido.email}</p>
      <p><strong>Dirección:</strong> {pedido.direccion}</p>
      <p><strong>Fecha:</strong> {new Date(pedido.fecha).toLocaleString()}</p>
      <p><strong>Método de pago:</strong> {pedido.metodoPago || 'No especificado'}</p>

      <h5 className="mt-4">Productos:</h5>
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio unidad</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(items)
            .filter(([_, cantidad]) => cantidad > 0)
            .map(([id, cantidad]) => (
              <tr key={id}>
                <td>
                  {productos[id]?.imagen ? (
                    <img src={productos[id].imagen} alt={productos[id]?.Nombre} width="60" />
                  ) : 'Sin imagen'}
                </td>
                <td>{productos[id]?.Nombre || id}</td>
                <td>{cantidad}</td>
                <td>{productos[id]?.Precio || "0.00"} €</td>
                <td>{calcularSubtotal(id, cantidad)} €</td>
              </tr>
          ))}
        </tbody>
      </table>

      <h5>Total: {calcularTotal()} €</h5>

      <Button variant="danger" onClick={borrarPedido} className="mt-3">
        Eliminar pedido
      </Button>
    </div>
  );
}

export default PedidoDetalle;
