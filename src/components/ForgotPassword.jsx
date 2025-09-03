// src/components/ForgotPassword.jsx
import React, { useState } from 'react';
import './Login.css';

function ForgotPassword({ onBack }) {
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1); // 1 = check user, 2 = reset password
  const [message, setMessage] = useState('');

  // Step 1: Check if username exists
  const handleCheckUser = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://intern-portal-backend-yin4.onrender.com/api/reset-password-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStep(2); // move to next step
        setMessage('');
      } else {
        setMessage("User not found!");
      }
    } catch (err) {
      setMessage("Something went wrong. Try again.");
    }
  };

  // Step 2: Update password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://intern-portal-backend-yin4.onrender.com/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, newPassword })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setMessage("Password updated successfully! Go back to login.");
      } else {
        setMessage(data.message || "Error updating password");
      }
    } catch (err) {
      setMessage("Something went wrong. Try again.");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-heading">Forgot Password</h2>

      {step === 1 && (
        <form className="login-form" onSubmit={handleCheckUser}>
          <input
            className="login-input"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button className="login-button" type="submit">Next</button>
        </form>
      )}

      {step === 2 && (
        <form className="login-form" onSubmit={handleResetPassword}>
          <input
            className="login-input"
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button className="login-button" type="submit">Reset Password</button>
        </form>
      )}

      {message && <p className="login-message">{message}</p>}

      <div
        className="back-to-login"
        onClick={onBack}
        style={{ cursor: "pointer", color: "blue", marginTop: "10px" }}
      >
        Back to Login
      </div>
    </div>
  );
}

export default ForgotPassword;
