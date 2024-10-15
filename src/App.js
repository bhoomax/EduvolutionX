



// src/App.js
import React, { useState } from 'react';
import './styles.css';
import Login from './components/Login'; // Adjust the path as necessary
import MainComponent from './components/MainComponent'; // Your main content component

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');

    const handleLoginSuccess = (user) => {
        setIsLoggedIn(true);
        setUsername(user); // Set the username when login is successful
    };

    return (
        <div className="App">
            {isLoggedIn ? (
                <MainComponent username={username} /> // Pass the username prop
            ) : (
                <Login onLoginSuccess={handleLoginSuccess} />
            )}
        </div>
    );
}

export default App;
