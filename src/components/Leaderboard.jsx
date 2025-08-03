// src/components/Leaderboard.jsx
import React, { useEffect, useState } from 'react';
import './Leaderboard.css';

function Leaderboard({ onBack }) {
  const [interns, setInterns] = useState([]);

  useEffect(() => {
    fetch("https://intern-portal-backend-yin4.onrender.com/api/interns")
      .then((res) => res.json())
      .then((data) => {
        // Sort by donation amount descending
        const sorted = [...data].sort((a, b) => b.amount - a.amount);
        setInterns(sorted);
      })
      .catch((err) => console.error("Failed to fetch leaderboard:", err));
  }, []);

  return (
    <div>
     <button onClick={onBack} className="btn-back">Back to Dashboard</button>
    
    <div className="leaderboard-container">  
      <h2>Leaderboard</h2>
      <ul className="leaderboard-list">
        {interns.map((intern, index) => (
          <li key={index}>
            <span>{index + 1}. {intern.name}</span>
            <span>₹{intern.amount}</span>
          </li>
        ))}
      </ul>
     
    </div>
    </div>
  );
}

export default Leaderboard;
