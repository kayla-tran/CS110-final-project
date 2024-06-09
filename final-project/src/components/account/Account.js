import React from 'react';
import './Account.css';
import Logout from './Logout'; // Assuming Logout component is in a separate file

function Account() {
  return (
    <div>
      <h1>Account</h1>
      <p>Your profile information will be displayed here.</p>
      <Logout /> {/* Logout button */}
    </div>
  );
}

export default Account;
