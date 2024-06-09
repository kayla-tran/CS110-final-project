import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Account.css';
import Logout from './Logout'; // Assuming Logout component is in a separate file

function Account({ authToken, setAuthToken }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async (token) => {
      try {
        console.log("Auth Token:", token); // Debugging
        const response = await fetch('http://localhost:8080/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        console.log("User Data:", data); // Debugging
        if (data.user) {
          setUser(data.user);
        } else {
          console.error('No user data found');
          navigate('/login');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        navigate('/login');
      }
    };

    if (authToken) {
      fetchUserData(authToken);
    } else {
      console.log('No authToken found');
      navigate('/login');
    }
  }, [authToken, navigate]);

  const handleLogout = () => {
    console.log('Logging out...');
    localStorage.removeItem('authToken');
    setAuthToken(null);
    setUser(null);
    navigate('/login');
  };

  return (
    <div>
      <h1>Account</h1>
      {user ? (
        <div>
          <p>Hello, {user.username}! This is your account!</p>
        </div>
      ) : (
        <p>Please login to view your account.</p>
      )}
      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Account;
