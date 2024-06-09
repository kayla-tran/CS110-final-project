import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ setAuthToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isRegister ? 'http://localhost:8080/register' : 'http://localhost:8080/login';
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log('Login response data:', data); // Debugging

      if (data.error) {
        setMessage(data.error);
      } else {
        if (data.token) {
          setMessage(data.message);
          localStorage.setItem('authToken', data.token);
          console.log('Token set in localStorage:', data.token); // Debugging
          setAuthToken(data.token);
          navigate('/account');
        } else {
          console.error('No token found in response data');
          setMessage('No token found in response data');
        }
      }
    } catch (err) {
      console.error("Error during fetch:", err);
      setMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="login-container">
      <h2>{isRegister ? 'Register' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
      </form>
      <p>{message}</p>
      <button onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? 'Switch to Login' : 'Switch to Register'}
      </button>
    </div>
  );
};

export default Login;
