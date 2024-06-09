import React from 'react';

const Logout = () => {
  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Remove the authentication token
    // Perform any additional logout operations, such as redirecting to the login page
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;
