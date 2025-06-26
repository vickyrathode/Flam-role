import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';
import { useAppContext } from '../context/AppContext';

const tabList = ['Overview', 'Projects', 'Feedback'];

// Helper to generate mock data
function getMockBio(name) {
  return `${name} is a dedicated employee with a passion for excellence and teamwork. Always striving for growth and innovation.`;
}
function getMockProjects() {
  return [
    { name: 'Onboarding Portal', year: 2024 },
    { name: 'Performance Review System', year: 2023 },
    { name: 'Employee Wellness App', year: 2022 },
  ];
}
function getMockFeedback() {
  return [
    { from: 'Manager', text: 'Consistently exceeds expectations!', date: '2025-05-10' },
    { from: 'Peer', text: 'Great team player and communicator.', date: '2025-03-22' },
  ];
}
function getMockPerformance() {
  return [
    { year: 2025, rating: Math.round(Math.random() * 2 + 3) },
    { year: 2024, rating: Math.round(Math.random() * 2 + 3) },
    { year: 2023, rating: Math.round(Math.random() * 2 + 3) },
  ];
}

const EmployeeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useAppContext();
  const user = (state.users || []).find(u => String(u.id) === String(id));
  const [tab, setTab] = useState('Overview');

  // Mock data for tabs
  const projects = getMockProjects();
  const feedback = getMockFeedback();
  const performance = getMockPerformance();

  if (!user) {
    return (
      <div style={{ padding: 32, textAlign: 'center' }}>
        <div style={{ fontSize: 20, color: '#888' }}>User not found.</div>
        <Button style={{ marginTop: 24 }} onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: 32 }}>
      <Button style={{ marginBottom: 16 }} onClick={() => navigate(-1)}>← Back</Button>
      <Card style={{ textAlign: 'center', marginBottom: 24 }}>
        <img src={user.avatar} alt={user.firstName} style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', marginBottom: 12 }} />
        <div style={{ fontWeight: 700, fontSize: 22 }}>{user.firstName} {user.lastName}</div>
        <div style={{ color: '#555', marginBottom: 6 }}>{user.email}</div>
        <Badge label={user.department} color="#1976d2" style={{ marginBottom: 8 }} />
        <div style={{ color: '#888', fontSize: 15, marginBottom: 6 }}>Age: {user.age}</div>
        <div style={{ color: '#888', fontSize: 15, marginBottom: 6 }}>Phone: {user.phone}</div>
        <div style={{ color: '#888', fontSize: 15, marginBottom: 6 }}>Address: {user.address?.address}, {user.address?.city}</div>
        <div style={{ margin: '8px 0', fontSize: 15 }}>
          Rating: {Array.from({ length: 5 }, (_, i) => (
            <span key={i} style={{ color: i < Math.round(user.rating) ? '#FFD600' : '#ccc', fontSize: 18 }}>★</span>
          ))} <b>{user.rating}</b>
        </div>
      </Card>
      {/* Tabs */}
      <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginBottom: 24 }}>
        {tabList.map(t => (
          <Button
            key={t}
            style={{
              background: tab === t ? '#1976d2' : '#eee',
              color: tab === t ? '#fff' : '#222',
              minWidth: 100,
              transition: 'background 0.2s, color 0.2s',
              boxShadow: tab === t ? '0 2px 8px rgba(25,118,210,0.10)' : 'none',
              transform: tab === t ? 'scale(1.05)' : 'scale(1)',
            }}
            onClick={() => setTab(t)}
          >
            {t}
          </Button>
        ))}
      </div>
      {/* Tab Content */}
      <div style={{ minHeight: 180, transition: 'opacity 0.4s', opacity: 1 }} key={tab}>
        {tab === 'Overview' && (
          <div style={{ fontSize: 17, color: '#444', textAlign: 'left', animation: 'fadeIn 0.5s' }}>
            <b>Bio:</b> <br />
            {getMockBio(user.firstName)}
            <br /><br />
            <b>Performance History:</b>
            <ul>
              {performance.map(p => (
                <li key={p.year}>
                  {p.year}: {Array.from({ length: 5 }, (_, i) => (
                    <span key={i} style={{ color: i < p.rating ? '#FFD600' : '#ccc', fontSize: 16 }}>★</span>
                  ))} ({p.rating} stars)
                </li>
              ))}
            </ul>
          </div>
        )}
        {tab === 'Projects' && (
          <div style={{ fontSize: 17, color: '#444', textAlign: 'left', animation: 'fadeIn 0.5s' }}>
            <b>Projects:</b>
            <ul>
              {projects.map(p => (
                <li key={p.name}>{p.name} ({p.year})</li>
              ))}
            </ul>
          </div>
        )}
        {tab === 'Feedback' && (
          <div style={{ fontSize: 17, color: '#444', textAlign: 'left', animation: 'fadeIn 0.5s' }}>
            <b>Feedback:</b>
            <ul>
              {feedback.map((f, i) => (
                <li key={i}><b>{f.from}:</b> {f.text} <span style={{ color: '#888', fontSize: 13 }}>({f.date})</span></li>
              ))}
            </ul>
            {/* Feedback form (mock) */}
            <div style={{ marginTop: 24 }}>
              <b>Submit Feedback:</b>
              <textarea style={{ width: '100%', minHeight: 60, marginTop: 8, borderRadius: 6, border: '1px solid #ccc', padding: 8 }} placeholder="Write feedback..." />
              <Button style={{ marginTop: 8 }}>Submit</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeDetails;

// Add fadeIn animation keyframes if not already present
if (!document.getElementById('fadeInKeyframes')) {
  const styleSheet = document.createElement('style');
  styleSheet.id = 'fadeInKeyframes';
  styleSheet.innerHTML = `@keyframes fadeIn { from { opacity: 0; transform: translateY(20px);} to { opacity: 1; transform: none; } }`;
  document.head.appendChild(styleSheet);
}
