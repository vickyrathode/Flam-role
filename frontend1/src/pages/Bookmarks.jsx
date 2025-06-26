import React from 'react';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';
import { useBookmarks } from '../hooks/useBookmarks';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Bookmarks = () => {
  const { state } = useAppContext();
  const { bookmarks, removeBookmark } = useBookmarks();
  const navigate = useNavigate();
  const bookmarkedUsers = (state.users || []).filter(u => bookmarks.includes(u.id));

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 32 }}>
      <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Bookmarked Employees</h2>
      {bookmarkedUsers.length === 0 ? (
        <div style={{ fontSize: 18, color: '#888', textAlign: 'center' }}>No bookmarks yet.</div>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center' }}>
          {bookmarkedUsers.map(user => (
            <Card key={user.id} style={{ width: 260, position: 'relative' }}>
              <img
                src={user.avatar}
                alt={user.firstName}
                style={{ width: 60, height: 60, borderRadius: '50%', objectFit: 'cover', marginBottom: 12 }}
              />
              <div style={{ fontWeight: 600, fontSize: 18 }}>{user.firstName} {user.lastName}</div>
              <div style={{ color: '#555', marginBottom: 6 }}>{user.email}</div>
              <Badge label={user.department} color="#1976d2" style={{ marginBottom: 8 }} />
              <div style={{ margin: '8px 0', fontSize: 15 }}>
                Rating: {Array.from({ length: 5 }, (_, i) => (
                  <span key={i} style={{ color: i < Math.round(user.rating) ? '#FFD600' : '#ccc', fontSize: 18 }}>★</span>
                ))} <b>{user.rating}</b>
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
                <Button style={{ background: '#1976d2' }} onClick={() => navigate(`/employee/${user.id}`)}>View</Button>
                <Button style={{ background: '#e53935' }} onClick={() => removeBookmark(user.id)}>Remove</Button>
                <Button style={{ background: '#43a047' }} onClick={() => alert('Promoted!')}>Promote</Button>
                <Button style={{ background: '#ffb300' }} onClick={() => alert('Assigned to Project!')}>Assign to Project</Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookmarks;
