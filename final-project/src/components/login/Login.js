import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../../firebase';
import './Login.css';

const Login = ({onLogin}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isRegister, setIsRegister] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const auth = getAuth(app);

    const handleGoogleClick = async () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: "select_account" });

        try {
            const result = await signInWithPopup(auth, provider);
            var userEmail = result.user.email;
            console.log(userEmail); // now email is isolated

            fetch('http://localhost:8080/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: userEmail }),
            })
                .then((response) => response.json())
                .then((data) => console.log(data))
                .catch((error) => console.error('Error: ', error))
        }
        catch (error) {
            console.log(error);
        }

        onLogin(userEmail);
        navigate('/profile');
    }

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
      if (data.error) {
        setMessage(data.error);
      } else {
        
          setMessage(data.message);

          console.log('Logged in with username:', username);
          console.log('Password:', password);

          onLogin(username);
          navigate('/profile');
        
      }
    } catch (err) {
      setMessage('An error occurred. Please try again later.');
    }
    onLogin(username);
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
                    autoComplete="username"
                    required
                />
                <br />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete={isRegister ? "new-password" : "current-password"}
                    required
                />
                <br />
                <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
                <button type="button" onClick={handleGoogleClick}>Sign in with Google</button>
            </form>
            <p>{message}</p>
            <button onClick={() => setIsRegister(!isRegister)}>
                {isRegister ? 'Switch to Login' : 'Switch to Register'}
            </button>
        </div>
    );
};

export default Login;
