import React from 'react';

function Navbar({ onLogout }) {
  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>Intern Portal</h2>
      <button style={styles.button} onClick={onLogout}>Logout</button>
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0077cc',
    padding: '1rem 2rem',
    color: '#fff',
  },
  logo: {
    margin: 0,
  },
  button: {
    background: 'white',
    color: '#0077cc',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
  }
};

export default Navbar;
