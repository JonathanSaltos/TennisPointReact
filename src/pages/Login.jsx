import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { Modal, Button } from 'react-bootstrap';

const API_KEY = 'AIzaSyDLY8jOE7FLbpu-zG-dSR798wfR0k0ihTQ';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [recoverEmail, setRecoverEmail] = useState('');
  const [showRecover, setShowRecover] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
        {
          email,
          password,
          returnSecureToken: true
        }
      );

      localStorage.setItem('token', response.data.idToken);
      localStorage.setItem('uid', response.data.localId);
      localStorage.setItem('email', response.data.email);

      alert(`Bienvenido, ${response.data.email}!\nTu ID es: ${response.data.localId}`);
      navigate('/');
      window.location.reload();
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Error al iniciar sesión');
    }
  };

  const handleRecoverPassword = async () => {
    setError('');
    if (!recoverEmail) {
      setError('Ingresa tu email para recuperar la contraseña.');
      return;
    }

    try {
      await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${API_KEY}`,
        {
          requestType: 'PASSWORD_RESET',
          email: recoverEmail
        }
      );
      setShowModal(true); // Mostrar modal
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Error al enviar correo de recuperación.');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Iniciar Sesión</h2>
      {error && <p className="text-danger">{error}</p>}

      <form onSubmit={handleLogin}>
        <input
          className="form-control mb-2"
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          className="form-control mb-2"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button className="btn btn-success" type="submit">
          Iniciar sesión
        </button>
      </form>

      <div className="mt-3">
        <button className="btn btn-link p-0" onClick={() => setShowRecover(!showRecover)}>
          ¿Olvidaste tu contraseña?
        </button>

        {showRecover && (
          <div className="mt-2">
            <input
              className="form-control mb-2"
              type="email"
              placeholder="Tu email para recuperar contraseña"
              value={recoverEmail}
              onChange={(e) => setRecoverEmail(e.target.value)}
            />
            <button className="btn btn-outline-primary btn-sm" onClick={handleRecoverPassword}>
              Enviar enlace de recuperación
            </button>
          </div>
        )}
      </div>

      {/* Modal de confirmación */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Recuperación de contraseña</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Se ha enviado un enlace de recuperación a tu correo electrónico.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => setShowModal(false)}>
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Login;
