import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const API_KEY = 'AIzaSyDLY8jOE7FLbpu-zG-dSR798wfR0k0ihTQ';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
        {
          email,
          password,
          returnSecureToken: true
        }
      );

      // Guardar datos en localStorage
      localStorage.setItem('token', response.data.idToken);
      localStorage.setItem('uid', response.data.localId);
      localStorage.setItem('email', response.data.email);

      // Mostrar mensaje de bienvenida
      alert(`Bienvenido, ${response.data.email}!\nTu ID es: ${response.data.localId}`);

      // Redirigir y refrescar para que Header se actualice
      navigate('/');
      window.location.reload();
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Error al iniciar sesión');
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
    </div>
  );
}

export default Login;
