import React, { useState, useEffect } from 'react';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, format, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const styles = {
  calendar: {
    maxWidth: 700,
    margin: '2rem auto',
    background: '#fff',
    borderRadius: 8,
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    padding: '1rem',
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '1.5rem',
    gap: '2rem',
    position: 'relative',
  },
  navButton: {
    background: 'linear-gradient(90deg, #1976d2 60%, #64b5f6 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: 50,
    width: 44,
    height: 44,
    fontSize: '1.7em',
    cursor: 'pointer',
    boxShadow: '0 2px 8px #bbb',
    transition: 'background 0.2s, transform 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 2,
  },
  navButtonLeft: {
    left: 0,
  },
  navButtonRight: {
    right: 0,
  },
  monthTitle: {
    fontWeight: 900,
    fontSize: '2em',
    letterSpacing: 1,
    color: '#1976d2',
    textShadow: '0 2px 8px #e3f2fd',
    textAlign: 'center',
    width: 320,
  },
  days: { display: 'flex' },
  row: { display: 'flex' },
  dayName: { flex: 1, textAlign: 'center', padding: '0.5rem 0', fontWeight: 600 },
  cell: {
    flex: 1,
    textAlign: 'center',
    padding: '0.5rem 0',
    minHeight: 70,
    border: '1px solid #eee',
    cursor: 'pointer',
    position: 'relative',
    background: 'linear-gradient(180deg, #fafbfc 80%, #e3f2fd 100%)',
    transition: 'background 0.2s, box-shadow 0.3s',
    borderRadius: 12,
    margin: 3,
    boxShadow: '0 2px 8px #eee',
    animation: 'fadeIn 0.5s',
  },
  '@keyframes fadeIn': {
    from: { opacity: 0, transform: 'scale(0.95)' },
    to: { opacity: 1, transform: 'scale(1)' },
  },
  today: {
    background: 'linear-gradient(180deg, #e3f2fd 80%, #bbdefb 100%)',
    border: '2px solid #1976d2',
    boxShadow: '0 0 12px #1976d2',
  },
  button: {
    background: '#1976d2',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    padding: '0.5em 1.2em',
    fontSize: '1.1em',
    cursor: 'pointer',
    margin: '0 0.5em',
    boxShadow: '0 2px 8px #bbb',
    transition: 'background 0.2s',
    fontWeight: 600,
    letterSpacing: 0.5,
  },
  disabled: {
    color: '#bbb',
    background: '#f5f5f5',
    cursor: 'not-allowed',
  },
  event: {
    margin: '2px 0',
    padding: '2px 4px',
    borderRadius: 4,
    color: '#fff',
    fontSize: '0.85em',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  layout: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '2rem',
    maxWidth: 1100,
    margin: '2rem auto',
    width: '100%',
  },
  leftCol: {
    width: '25%',
    minWidth: 220,
    maxWidth: 320,
    flex: '0 0 25%',
    display: 'flex',
    flexDirection: 'column',
  },
  centerCol: {
    width: '50%',
    minWidth: 340,
    flex: '1 0 50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

};

const getRecurringDates = (event, monthStart, monthEnd) => {
  const dates = [];
  const eventDate = new Date(event.date);
  if (event.recurrence === 'none') {
    if (eventDate >= monthStart && eventDate <= monthEnd) dates.push(eventDate);
  } else if (event.recurrence === 'daily') {
    let d = new Date(monthStart);
    while (d <= monthEnd) {
      if (d >= eventDate) dates.push(new Date(d));
      d.setDate(d.getDate() + 1);
    }
  } else if (event.recurrence === 'weekly') {
    let d = new Date(monthStart);
    while (d <= monthEnd) {
      if (d >= eventDate && d.getDay() === eventDate.getDay()) dates.push(new Date(d));
      d.setDate(d.getDate() + 1);
    }
  } else if (event.recurrence === 'monthly') {
    let d = new Date(monthStart);
    while (d <= monthEnd) {
      if (d >= eventDate && d.getDate() === eventDate.getDate()) dates.push(new Date(d));
      d.setDate(d.getDate() + 1);
    }
  }
  return dates;
};

const DraggableEvent = ({ event, onEventClick }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'event',
    item: { ...event },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        ...styles.event,
        background: event.color || '#1976d2',
        margin: '4px 0',
        border: '1px solid #fff',
        boxShadow: '0 1px 4px #bbb',
        cursor: 'grab',
      }}
      onClick={e => { e.stopPropagation(); onEventClick(event); }}
    >
      {event.title}
    </div>
  );
};

const CalendarCell = ({ cell, onDayClick, onEventClick, onDropEvent }) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'event',
    drop: (item) => onDropEvent(item, cell.date),
    canDrop: (item) => cell.isCurrentMonth,
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });
  let cellStyle = { ...styles.cell };
  if (!cell.isCurrentMonth) cellStyle = { ...cellStyle, ...styles.disabled };
  if (cell.isToday) cellStyle = { ...cellStyle, ...styles.today };
  if (isOver && canDrop) cellStyle = { ...cellStyle, background: '#c8e6c9' };
  return (
    <div
      ref={drop}
      style={cellStyle}
      onClick={() => cell.isCurrentMonth && onDayClick(cell.date)}
    >
      <span style={{ fontWeight: cell.isToday ? 700 : 400 }}>{cell.formatted}</span>
      {cell.events.map(ev => (
        <DraggableEvent key={ev.id + ev.date} event={ev} onEventClick={onEventClick} />
      ))}
    </div>
  );
};

const Calendar = ({ events, onDayClick, onEventClick, onDropEvent, onCompleteEvent, currentDate, setCurrentDate }) => {
  const [calendarRows, setCalendarRows] = useState([]);
  const [selectedCell, setSelectedCell] = useState(null);
  const [popupCell, setPopupCell] = useState(null);

  useEffect(() => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, 'd');
        const cloneDay = day;
        // Gather all events (including recurring) for this day
        const dayEvents = [];
        events.forEach(e => {
          const recDates = getRecurringDates(e, startDate, endDate);
          recDates.forEach(rd => {
            if (isSameDay(rd, day)) dayEvents.push({ ...e, date: rd });
          });
        });
        days.push({
          date: cloneDay,
          formatted: formattedDate,
          isCurrentMonth: isSameMonth(day, monthStart),
          isToday: isSameDay(day, new Date()),
          events: dayEvents,
        });
        day = addDays(day, 1);
      }
      rows.push(days);
      days = [];
    }
    setCalendarRows(rows);
  }, [currentDate, events]);

  const handleCellClick = (cell) => {
    setSelectedCell(cell);
    if (cell.events.length === 0) {
      onDayClick(cell.date);
    } else {
      setPopupCell(cell);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={styles.layout}>

        {/* Calendar (center) */}
        <div style={styles.centerCol}>
          <div style={{position:'relative', width:'100%'}}>
            <div style={styles.header}>
              <button
                style={{ ...styles.navButton, ...styles.navButtonLeft, transform: 'translateY(-50%) scale(1)', transition: 'transform 0.2s' }}
                onClick={() => setCurrentDate(subMonths(currentDate, 1))}
                onMouseDown={e => e.currentTarget.style.transform = 'translateY(-50%) scale(0.92)'}
                onMouseUp={e => e.currentTarget.style.transform = 'translateY(-50%) scale(1)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(-50%) scale(1)'}
                aria-label="Previous Month"
              >
                &#8592;
              </button>
              <span style={styles.monthTitle}>{format(currentDate, 'MMMM yyyy')}</span>
              <button
                style={{ ...styles.navButton, ...styles.navButtonRight, transform: 'translateY(-50%) scale(1)', transition: 'transform 0.2s' }}
                onClick={() => setCurrentDate(addMonths(currentDate, 1))}
                onMouseDown={e => e.currentTarget.style.transform = 'translateY(-50%) scale(0.92)'}
                onMouseUp={e => e.currentTarget.style.transform = 'translateY(-50%) scale(1)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(-50%) scale(1)'}
                aria-label="Next Month"
              >
                &#8594;
              </button>
            </div>
            {calendarRows.map((row, i) => (
              <div style={styles.row} key={i}>
                {row.map((cell, idx) => {
                  let cellStyle = { ...styles.cell, borderRadius: 8, margin: 2, boxShadow: cell.isToday ? '0 0 8px #1976d2' : '0 1px 2px #eee' };
                  if (!cell.isCurrentMonth) cellStyle = { ...cellStyle, ...styles.disabled };
                  if (cell.isToday) cellStyle = { ...cellStyle, ...styles.today };
                  return (
                    <div
                      key={idx}
                      style={cellStyle}
                      onClick={() => handleCellClick(cell)}
                    >
                      <span style={{fontWeight:cell.isToday?700:400}}>{cell.formatted}</span>
                      {cell.events.map(ev => (
                        <DraggableEvent key={ev.id+ev.date} event={ev} onEventClick={onEventClick} />
                      ))}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
          {popupCell && popupCell.events.length > 0 && (
            <div style={{
              position: 'absolute',
              top: 120,
              left: '50%',
              transform: 'translateX(-50%)',
              background: '#fff',
              borderRadius: 14,
              boxShadow: '0 8px 32px #1976d2aa',
              padding: '2em 2.5em',
              zIndex: 100,
              minWidth: 260,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 16,
              border: '2px solid #1976d2',
            }}>
              <div style={{fontWeight:700, fontSize:'1.1em', marginBottom:8}}>Event Options</div>
              <button style={{...styles.button, background:'#1976d2', width:180}} onClick={e => {e.stopPropagation(); onEventClick(popupCell.events[0]); setPopupCell(null);}}>Edit</button>
              <button style={{...styles.button, background:'#43a047', width:180}} onClick={e => {e.stopPropagation(); onCompleteEvent(popupCell.events[0]); setPopupCell(null);}}>Complete</button>
              <button style={{...styles.button, background:'#ff9800', width:180}} onClick={e => {e.stopPropagation(); onDayClick(popupCell.date); setPopupCell(null);}}>Add Another</button>
              <button style={{...styles.button, background:'#bbb', color:'#222', width:180}} onClick={() => setPopupCell(null)}>Close</button>
            </div>
          )}
        </div>
   
      </div>
    </DndProvider>
  );
};

export default Calendar;
