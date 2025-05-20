// Gracias.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function Gracias() {
  const navigate = useNavigate();

  // Limpiar el carrito al cargar esta pantalla
  useEffect(() => {
    localStorage.removeItem('cart');
  }, []);

  const handleNuevoPedido = () => {
    navigate('/');
  };

  return (
    <div className="container text-center mt-5">
      <h2>¡Gracias por tu pedido!</h2>
      <p>Tu pedido se ha realizado correctamente. En breve recibirás la confirmación por email.</p>

      <Button variant="success" className="mt-4" onClick={handleNuevoPedido}>
        REALIZAR UN NUEVO PEDIDO
      </Button>
    </div>
  );
}

export default Gracias;
