// src/components/Login.jsx
import React, { useState } from 'react';
import './Login.css';

function Login({ onLogin, onForgotPassword }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("https://intern-portal-backend-yin4.onrender.com/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (res.ok && data.success) {
      setError("");
      onLogin(username); // ✅ redirect only if both name+password are correct
    } else {
      setError(data.message || "Invalid username or password");
    }
  } catch (err) {
    console.error("Login error:", err);
    setError("Something went wrong. Please try again.");
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
          <input
            className="login-input"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="login-button" type="submit">Login</button>
          {error && <p className="login-error">{error}</p>}
        </form>
        <div
          className="forgot-password-link"
          onClick={onForgotPassword}
          style={{ cursor: "pointer", color: "blue", marginTop: "10px" }}
        >
          Forgot Password?
        </div>
      </div>
    </div>
  );
}

export default Login;
