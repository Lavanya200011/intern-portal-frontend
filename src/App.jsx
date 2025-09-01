// src/App.jsx
import { useState } from 'react';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import Dashboard from './components/Dashboard';
import Leaderboard from './components/Leaderboard';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleLogin = (user) => {
    setUsername(user);
    setIsLoggedIn(true);
    setShowForgotPassword(false); // ensure login page restores properly
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setShowLeaderboard(false);
  };

  const handleShowLeaderboard = () => {
    setShowLeaderboard(true);
  };

  const handleBackToDashboard = () => {
    setShowLeaderboard(false);
  };

  return (
    <>
      {!isLoggedIn ? (
        showForgotPassword ? (
          <ForgotPassword onBack={() => setShowForgotPassword(false)} />
        ) : (
          <Login 
            onLogin={handleLogin} 
            onForgotPassword={() => setShowForgotPassword(true)} 
          />
        )
      ) : showLeaderboard ? (
        <Leaderboard onBack={handleBackToDashboard} />
      ) : (
        <>
          <Dashboard username={username} onLogout={handleLogout} />
          <div className="button-container">
            <button onClick={handleShowLeaderboard} className="btn-leaderboard">
              View Leaderboard
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default App;
