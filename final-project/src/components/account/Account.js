import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Account.css';

function Account({ authToken, setAuthToken }) {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async (token) => {
      try {
        const response = await fetch('http://localhost:8080/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (data.user) {
          setUser(data.user);
          console.log(data.user.username); 
          setUsername(data.user.username); // this is incorrect, it only gets the userID not username for some reason
        } else {
          navigate('/login');
        }
      } catch (error) {
        navigate('/login');
      }
    };

    if (authToken) {
      fetchUserData(authToken);
    } else {
      navigate('/login');
    }
  }, [authToken, navigate]);

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:8080/logout', { method: 'POST' });
      localStorage.removeItem('authToken');
      setAuthToken(null);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="account-container">
      <h1>Welcome to your account, {user}</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Account;
