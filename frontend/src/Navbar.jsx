import React from 'react';

const styles = {
  navbar: {
    width: '100%',
    background: 'linear-gradient(90deg, #1976d2 60%, #64b5f6 100%)',
    color: '#fff',
    padding: '1.2em 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 900,
    fontSize: '2em',
    letterSpacing: 1.5,
    boxShadow: '0 2px 12px #1976d2aa',
    marginBottom: 24,
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },

  title: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 900,
    fontSize: '1.2em',
    letterSpacing: 2,
    color: '#fff',
    textShadow: '0 2px 8px #1565c0',
  },
};

const Navbar = () => (
  <div style={styles.navbar}>
    <span style={styles.title}>Event Calendar</span>
  </div>
);

export default Navbar;
