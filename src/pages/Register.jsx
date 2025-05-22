import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const API_KEY = 'AIzaSyDLY8jOE7FLbpu-zG-dSR798wfR0k0ihTQ';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
        {
          email,
          password,
          returnSecureToken: true
        }
      );
      localStorage.setItem('token', response.data.idToken);
      localStorage.setItem('uid', response.data.localId);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Error en el registro');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Registro</h2>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleRegister}>
        <input className="form-control mb-2" type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} required />
        <input className="form-control mb-2" type="password" placeholder="Contraseña" onChange={e => setPassword(e.target.value)} required />
        <button className="btn btn-primary" type="submit">Registrarse</button>
      </form>
    </div>
  );
}

export default Register;
