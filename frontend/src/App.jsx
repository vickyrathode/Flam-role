import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import Calendar from './Calendar';
import EventForm from './EventForm';

const LOCAL_STORAGE_KEY = 'calendar-events';

const layoutStyles = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '2rem',
  maxWidth: 1100,
  margin: '2rem auto',
  width: '100%',
};

const App = () => {
  const [events, setEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [formOpen, setFormOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setEvents(parsed);
      } catch (e) {
        setEvents([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(events));
  }, [events]);

  const handleDayClick = date => {
    setSelectedDate(date);
    setEditingEvent(null);
    setFormOpen(true);
  };

  const handleEventClick = event => {
    setEditingEvent(event);
    setFormOpen(true);
  };

  const handleSaveEvent = event => {
    const eventDate = (editingEvent ? event.date : selectedDate);
    const isConflict = events.some(e =>
      e.id !== (editingEvent && editingEvent.id) &&
      e.date === eventDate
    );
    if (isConflict) {
      alert('There is already an event on this day. Please edit the existing event or choose a different day.');
      return;
    }
    if (editingEvent) {
      setEvents(events.map(e => (e.id === editingEvent.id ? { ...event, id: editingEvent.id } : e)));
    } else {
      setEvents([...events, { ...event, id: Date.now(), date: selectedDate }]);
    }
    setFormOpen(false);
    setEditingEvent(null);
    setSelectedDate(null);
  };

  const handleDropEvent = (event, newDate) => {
    if (event.recurrence !== 'none') return;
    setEvents(events.map(e => (e.id === event.id ? { ...e, date: newDate } : e)));
  };

  const handleCompleteEvent = event => {
    // Mark this event as completed
    setEvents(prevEvents => {
      const updated = prevEvents.map(e => (e.id === event.id ? { ...e, completed: true } : e));
      // Find next event with same title (and recurrence) on a future date
      const futureEvents = prevEvents.filter(e =>
        e.title === event.title &&
        e.id !== event.id &&
        !e.completed &&
        new Date(e.date) > new Date(event.date)
      );
      if (futureEvents.length > 0) {
        // Optionally, you could highlight or scroll to the next event
        // For now, just keep it in the left panel as pending
      }
      return updated;
    });
  };

  const handleAddAnother = date => {
    setSelectedDate(date);
    setEditingEvent(null);
    setFormOpen(true);
  };

  return (
    <div>
      <Navbar />
      <div style={layoutStyles}>
        <LeftPanel
          events={events.filter(ev => !ev.completed)}
          onEventClick={handleEventClick}
          onCompleteEvent={handleCompleteEvent}
          onAddAnother={handleAddAnother}
        />
        <div style={{ flex: '1 0 50%', minWidth: 340, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Calendar
            events={events}
            onDayClick={handleDayClick}
            onEventClick={handleEventClick}
            onDropEvent={handleDropEvent}
            onCompleteEvent={handleCompleteEvent}
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
          />
        </div>
        <RightPanel events={events.filter(ev => ev.completed)} />
      </div>
      <EventForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSave={handleSaveEvent}
        eventData={editingEvent}
      />
    </div>
  );
};

export default App;
