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
    cursor: 'pointer',
    borderLeft: '6px solid #1976d2',
    transition: 'background 0.2s, box-shadow 0.2s',
    position: 'relative',
  },
  eventListColor: {
    width: 18,
    height: 18,
    borderRadius: '50%',
    marginRight: 10,
    border: '2px solid #1976d2',
    display: 'inline-block',
  },
  button: {
    background: '#1976d2',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    padding: '0.5em 1.2em',
    fontSize: '1.1em',
    cursor: 'pointer',
    boxShadow: '0 2px 8px #bbb',
    transition: 'background 0.2s',
    fontWeight: 600,
    letterSpacing: 0.5,
    width: 140,
  },
  buttonComplete: {
    background: '#43a047',
  },
  buttonAdd: {
    background: '#ff9800',
  },
  buttonClose: {
    background: '#bbb',
    color: '#222',
  },
};

const LeftPanel = ({ events, onEventClick, onCompleteEvent }) => {
  const [openId, setOpenId] = React.useState(null);

  return (
    <div style={styles.eventList}>
      <div style={styles.eventListTitle}>Pending Events</div>
      {events.length === 0 && <div style={{color:'#888'}}>No pending events.</div>}
      {events.map(ev => (
        <div key={ev.id}>
          <div
            style={{ ...styles.eventListItem, borderLeft: `6px solid ${ev.color || '#1976d2'}` }}
            onClick={() => setOpenId(openId === ev.id ? null : ev.id)}
          >
            <span style={{ ...styles.eventListColor, background: ev.color || '#1976d2' }}></span>
            <span style={{fontWeight:600}}>{ev.title}</span>
            <span style={{marginLeft:'auto', fontSize:'0.9em', color:'#555'}}>{ev.date ? new Date(ev.date).toLocaleDateString() : ''}</span>
          </div>
          {openId === ev.id && (
            <div style={{margin: '8px 0 16px 0', display: 'flex', gap: 8, justifyContent: 'center', animation: 'fadeIn 0.2s'}}>
              <button style={styles.button} onClick={() => onEventClick(ev)}>Edit</button>
              <button style={{...styles.button, ...styles.buttonComplete}} onClick={() => onCompleteEvent(ev)}>Complete</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default LeftPanel;
