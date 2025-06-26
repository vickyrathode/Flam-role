import React from 'react';

const styles = {
  eventList: {
    minWidth: 220,
    maxWidth: 320,
    flex: '0 0 25%',
    background: '#fff',
    borderRadius: 16,
    boxShadow: '0 4px 24px #e0e0e0',
    padding: '1.5rem 1.2rem',
    border: '1px solid #e0e0e0',
    maxHeight: 650,
    overflowY: 'auto',
    marginTop: 10,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  eventListTitle: {
    fontWeight: 800,
    fontSize: '1.25em',
    marginBottom: 18,
    color: '#1976d2',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  eventListItem: {
    background: 'linear-gradient(90deg, #f7f7fa 60%, #e3f2fd 100%)',
    borderRadius: 10,
    padding: '0.8em 1em',
    marginBottom: 8,
    boxShadow: '0 2px 8px #eee',
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    borderLeft: '6px solid #1976d2',
    opacity: 0.6,
  },
  eventListColor: {
    width: 18,
    height: 18,
    borderRadius: '50%',
    marginRight: 10,
    border: '2px solid #1976d2',
    display: 'inline-block',
  },
};

const RightPanel = ({ events }) => (
  <div style={styles.eventList}>
    <div style={styles.eventListTitle}>Completed Events</div>
    {events.length === 0 && <div style={{color:'#888'}}>No completed events.</div>}
    {events.map(ev => (
      <div
        key={ev.id}
        style={{ ...styles.eventListItem, borderLeft: `6px solid ${ev.color || '#1976d2'}` }}
      >
        <span style={{ ...styles.eventListColor, background: ev.color || '#1976d2' }}></span>
        <span style={{fontWeight:600}}>{ev.title}</span>
        <span style={{marginLeft:'auto', fontSize:'0.9em', color:'#555'}}>{ev.date ? new Date(ev.date).toLocaleDateString() : ''}</span>
      </div>
    ))}
  </div>
);

export default RightPanel;
