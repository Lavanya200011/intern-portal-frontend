import React, { useEffect, useState } from "react";
import './Dashboard.css';

function Dashboard({ username, onLogout }) {
  const [interns, setInterns] = useState([]);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetch("https://intern-portal-backend-yin4.onrender.com/api/interns")
      .then((res) => res.json())
      .then((data) => {
        setInterns(data);

        const matched = data.find(intern =>
          intern.name.toLowerCase().includes(username.toLowerCase())
        );

        setUserData(matched);
      })
      .catch((err) => console.error("Failed to fetch data:", err));
  }, [username]);

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-heading">Welcome, {username}!</h2>
      <button className="logout-button" onClick={onLogout}>Logout</button>

      {userData ? (
        <div className="user-info">
          <h3>Your Info:</h3>
          <p>Referal code: {userData.referalcode}</p>
          <p>Donation Raised: ₹{userData.amount}</p>
        </div>
      ) : (
        <p>Loading your data...</p>
      )}

      <div className="extra-info">
        <h3>Rewards/Unlockables</h3>
        <ul>
          <li>Free Internship Certificate</li>
          <li>Leaderboard Entry</li>
          <li>Exclusive Webinars</li>
        </ul>
      </div>
     
    </div>
  );
}

export default Dashboard;
