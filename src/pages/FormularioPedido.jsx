import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Alert, Container } from 'react-bootstrap';

function Formulario() {
  const [cliente, setCliente] = useState({
    nombre: '',
    direccion: '',
    telefono: '',
    email: ''
  });
  const [error, setError] = useState('');
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://dsm-react-webapp-default-rtdb.europe-west1.firebasedatabase.app/productos.json')
      .then((res) => {
        const data = res.data || {};
        const productosArray = Object.entries(data).map(([id, val]) => ({ id, ...val }));
        setProductos(productosArray);
        localStorage.setItem('productos', JSON.stringify(data)); // Guardamos los productos con precios
      });
  }, []);

  const handleChange = (e) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cliente.nombre || !cliente.direccion || !cliente.email) {
      setError('Por favor rellena los campos obligatorios');
      return;
    }

    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    const productosData = JSON.parse(localStorage.getItem('productos')) || {};
    const uid = localStorage.getItem('uid');
    const token = localStorage.getItem('token');

    if (!uid || !token) {
      setError('No has iniciado sesión. Por favor inicia sesión para realizar un pedido.');
      return;
    }

    if (Object.keys(cart).length === 0) {
      setError('El carrito está vacío');
      return;
    }

    const total = Object.entries(cart).reduce((acc, [id, cantidad]) => {
      const precio = parseFloat(productosData[id]?.Precio || 0);
      return acc + cantidad * precio;
    }, 0).toFixed(2);

    const pedido = {
      nombre: cliente.nombre,
      direccion: cliente.direccion,
      email: cliente.email,
      telefono: cliente.telefono,
      items: cart,
      total,
      fecha: new Date().toISOString(),
      userId: uid
    };

    try {
      await axios.post(
        `https://dsm-react-webapp-default-rtdb.europe-west1.firebasedatabase.app/pedidos.json?auth=${token}`,
        pedido
      );
      localStorage.removeItem('cart');
      localStorage.removeItem('productos');
      navigate('/gracias');
    } catch (err) {
      setError('Error al enviar el pedido. Inténtalo de nuevo.');
    }
  };

  return (
    <Container className="mt-4">
      <h2>Formulario de Pedido</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formNombre">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            name="nombre"
            value={cliente.nombre}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDireccion">
          <Form.Label>Dirección</Form.Label>
          <Form.Control
            type="text"
            name="direccion"
            value={cliente.direccion}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formTelefono">
          <Form.Label>Teléfono</Form.Label>
          <Form.Control
            type="tel"
            name="telefono"
            value={cliente.telefono}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={cliente.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="success" type="submit">
          REALIZAR PEDIDO
        </Button>
      </Form>
    </Container>
  );
}

export default Formulario;
