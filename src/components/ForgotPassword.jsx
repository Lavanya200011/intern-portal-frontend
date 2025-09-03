// src/components/ForgotPassword.jsx
import React, { useState } from "react";
import "./Login.css";

function ForgotPassword({ onBack }) {
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1); // 1=enter username, 2=reset password
  const [message, setMessage] = useState("");

  // Step 1: Check if username exists
  const handleUsernameSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    try {
      const res = await fetch("https://intern-portal-backend-yin4.onrender.com/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStep(2); // Move to reset password step
        setMessage("User found. Please enter a new password.");
      } else {
        setMessage("User not found!");
      }
    } catch (err) {
      setMessage("Something went wrong. Try again.");
    }
  };

  // Step 2: Reset password
  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (!newPassword.trim()) return;

    try {
      const res = await fetch("http://localhost:5000/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, newPassword }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setMessage("Password updated successfully! Please login again.");
        setTimeout(onBack, 2000); // go back to login after 2 sec
      } else {
        setMessage("Failed to update password.");
      }
    } catch (err) {
      setMessage("Something went wrong. Try again.");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-heading">Forgot Password</h2>

      {step === 1 ? (
        <form className="login-form" onSubmit={handleUsernameSubmit}>
          <input
            className="login-input"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button className="login-button" type="submit">
            Submit
          </button>
        </form>
      ) : (
        <form className="login-form" onSubmit={handlePasswordReset}>
          <input
            className="login-input"
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button className="login-button" type="submit">
            Reset Password
          </button>
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
