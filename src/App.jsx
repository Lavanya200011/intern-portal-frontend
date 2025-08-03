// src/App.jsx
import { useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Leaderboard from './components/Leaderboard';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const handleLogin = (user) => {
    setUsername(user);
    setIsLoggedIn(true);
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
        <Login onLogin={handleLogin} />
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
