// src/components/Login.jsx
import React, { useState } from 'react';
import './Login.css';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    try {
      const res = await fetch("https://intern-portal-backend-yin4.onrender.com/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setError('');
        onLogin(username); // login successful
      } else {
        setError("Invalid username");
      }
    } catch (err) {
      setError("Invalid name error");
    }
  };

  return (
  <div>
   <h4 className="login-instruction">enter name as (lavanya or rahul or rohit)</h4>
    <div className="login-container">
      <h2 className="login-heading">Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          className="login-input"
          type="text"
          placeholder="Enter your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button className="login-button" type="submit">Login</button>
        {error && <p className="login-error">{error}</p>}
      </form>
    </div>
    </div>
  );
}

export default Login;
