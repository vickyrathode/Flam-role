import React, { useState } from 'react';

const defaultEvent = {
  title: '',
  date: '',
  time: '',
  description: '',
  recurrence: 'none',
  color: '#1976d2',
};

const recurrenceOptions = [
  { value: 'none', label: 'None' },
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'custom', label: 'Custom' },
];

const styles = {
  backdrop: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    background: 'rgba(0,0,0,0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modal: {
    background: '#fff',
    padding: '2rem',
    borderRadius: 16,
    minWidth: 340,
    boxShadow: '0 4px 32px rgba(0,0,0,0.18)',
    border: '1px solid #e0e0e0',
    maxWidth: 400,
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '1rem',
    marginTop: '1.5rem',
  },
  input: {
    width: '100%',
    margin: '0.7rem 0',
    padding: '0.7rem',
    borderRadius: 8,
    border: '1px solid #bdbdbd',
    fontSize: '1.1rem',
    background: '#f7f7fa',
    boxSizing: 'border-box',
  },
  textarea: {
    width: '100%',
    margin: '0.7rem 0',
    padding: '0.7rem',
    borderRadius: 8,
    border: '1px solid #bdbdbd',
    fontSize: '1.1rem',
    minHeight: 70,
    background: '#f7f7fa',
    boxSizing: 'border-box',
  },
  select: {
    width: '100%',
    margin: '0.7rem 0',
    padding: '0.7rem',
    borderRadius: 8,
    border: '1px solid #bdbdbd',
    fontSize: '1.1rem',
    background: '#f7f7fa',
    boxSizing: 'border-box',
  },
  color: {
    margin: '0.7rem 0',
    width: 44,
    height: 44,
    border: 'none',
    background: 'none',
    cursor: 'pointer',
  },
};

const EventForm = ({ open, onClose, onSave, eventData }) => {
  const [event, setEvent] = useState(eventData || defaultEvent);

  React.useEffect(() => {
    setEvent(eventData || defaultEvent);
  }, [eventData, open]);

  if (!open) return null;

  const handleChange = e => {
    const { name, value } = e.target;
    setEvent(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSave(event);
  };

  return (
    <div style={styles.backdrop}>
      <div style={styles.modal}>
        <h2>{eventData ? 'Edit Event' : 'Add Event'}</h2>
        <form onSubmit={handleSubmit}>
          <input name="title" value={event.title} onChange={handleChange} placeholder="Event Title" required style={styles.input} />
          <input name="date" type="date" value={event.date} onChange={handleChange} required style={styles.input} />
          <input name="time" type="time" value={event.time} onChange={handleChange} required style={styles.input} />
          <textarea name="description" value={event.description} onChange={handleChange} placeholder="Description" style={styles.textarea} />
          <select name="recurrence" value={event.recurrence} onChange={handleChange} style={styles.select}>
            {recurrenceOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <input name="color" type="color" value={event.color} onChange={handleChange} style={styles.color} />
          <div style={styles.actions}>
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventForm;
