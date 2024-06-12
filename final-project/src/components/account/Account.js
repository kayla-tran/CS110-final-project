// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Account.css';

// function Account() {
//   const [user, setUser] = useState(null);
//   const [username, setUsername] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUserData = async (token) => {
//       try {
//         const response = await fetch('http://localhost:8080/profile', {
//           method: 'GET',
//           headers: {
//           }
//         });
//         const data = await response.json();
//         if (data.user) {
//           setUser(data.user);

//           setUsername(data.username);
//           // console.log(username);

//         } else {
//           navigate('/login');
//         }
//       } catch (error) {
//         navigate('/login');
//       }
//     };

    
//       navigate('/login');
    
//   }, [navigate]);

//   useEffect(() => {
//     if (username) {
//       console.log(username); // Log username after it has been updated
//     }
//   }, [username]);

//   const handleLogout = async () => {
//     try {
//       await fetch('http://localhost:8080/logout', { method: 'POST' });
//       navigate('/login');
//     } catch (error) {
//       console.error('Logout error:', error);
//     }
//   };

//   if (!user) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="account-container">
//       <h1>Welcome to your account, {username}</h1>
//       <button onClick={handleLogout}>Logout</button>
//     </div>
//   );
// }

// export default Account;

// Account page component (React)

// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// function Profile() {
//   const [username, setUsername] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetch('http://localhost:8080/profile')
//     .then(response => {
//       if (response.ok) {
//         return response.json();
//       } else {
//         throw new Error('Unauthorized');
//       }
//     })
//     .then(data => {
//       setUsername(data.username);
//     })
//     .catch(error => {
//       console.error('Error fetching profile:', error);
//       navigate('/login');
//     });
//   }, [navigate]);

//   const handleLogout = () => {
//     fetch('http://localhost:8080/logout', { method: 'POST' })
//     .then(response => {
//       if (response.ok) {
//         navigate('/login');
//       } else {
//         throw new Error('Logout failed');
//       }
//     })
//     .catch(error => {
//       console.error('Error logging out:', error);
//     });
//   };

//   if (!username) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1>Welcome to your profile, {username}</h1>
//       <button onClick={handleLogout}>Logout</button>
//     </div>
//   );
// }

// export default Profile;




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

