

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8080/profile')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Unauthorized');
        }
      })
      .then(data => {
        setUsername(data.username);
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
        navigate('/login');
      });
  }, [navigate]);

  const handleLogout = () => {
    fetch('http://localhost:8080/logout', { method: 'POST' })
      .then(response => {
        if (response.ok) {
          navigate('/login');
        } else {
          throw new Error('Logout failed');
        }
      })
      .catch(error => {
        console.error('Error logging out:', error);
      });
  };

  if (!username) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome to your profile, {username}</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Profile;

