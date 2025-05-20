import React, { useState } from 'react';
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
  const navigate = useNavigate();

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
    if (Object.keys(cart).length === 0) {
      setError('El carrito está vacío');
      return;
    }

    const pedido = {
      cliente,
      carrito: cart,
      fecha: new Date().toISOString(),
    };

    try {
      await axios.post(
        'https://dsm-react-webapp-default-rtdb.europe-west1.firebasedatabase.app/pedidos.json',
        pedido
      );
      localStorage.removeItem('cart');
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
