
import React, { useState } from 'react';
import './Login.css'; 
import logo1 from './pp.png';
import bg from './ol2.png';

function Login({ onLoginSuccess }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (data.success) {
                setLoginStatus('Login successful');
                onLoginSuccess(username); 
            } else {
                setLoginStatus('Invalid username or password');
            }
        } catch (error) {
            console.error('Login error:', error);
            setLoginStatus('An error occurred');
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="logo">
                    <img src={logo1} alt="Logo" />
                </div>
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                    <button type="submit">Login</button>
                </form>
                {loginStatus && <p>{loginStatus}</p>}
                <a href="#">Forgot your password?</a>
            </div>
            <div className="image-box">
                <img src={bg} alt="Login Image" />
            </div>
        </div>
    );
}

export default Login;
