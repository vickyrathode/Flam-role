import React, { useEffect, useRef } from 'react';
import { useAppContext } from '../context/AppContext';
import Chart from 'chart.js/auto';

const Analytics = () => {
  const { state } = useAppContext();
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // Calculate department-wise average ratings
  const deptRatings = {};
  (state.users || []).forEach(u => {
    if (!deptRatings[u.department]) deptRatings[u.department] = [];
    deptRatings[u.department].push(u.rating);
  });
  const deptLabels = Object.keys(deptRatings);
  const deptAverages = deptLabels.map(dep => {
    const arr = deptRatings[dep];
    return arr.length ? (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(2) : 0;
  });

  // Bookmark trends (mocked: just show count of bookmarks per department)
  const bookmarkCounts = {};
  (state.users || []).forEach(u => {
    if (!bookmarkCounts[u.department]) bookmarkCounts[u.department] = 0;
    if ((state.bookmarks || []).includes(u.id)) bookmarkCounts[u.department]++;
  });
  const bookmarkData = deptLabels.map(dep => bookmarkCounts[dep] || 0);

  useEffect(() => {
    if (chartInstance.current) chartInstance.current.destroy();
    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: deptLabels,
        datasets: [
          {
            label: 'Avg Rating',
            data: deptAverages,
            backgroundColor: '#1976d2',
            yAxisID: 'y',
          },
          {
            label: 'Bookmarks',
            data: bookmarkData,
            backgroundColor: '#ffb300',
            yAxisID: 'y1',
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          title: { display: true, text: 'Department Analytics' },
        },
        scales: {
          y: {
            type: 'linear',
            position: 'left',
            min: 0,
            max: 5,
            title: { display: true, text: 'Avg Rating' },
          },
          y1: {
            type: 'linear',
            position: 'right',
            min: 0,
            title: { display: true, text: 'Bookmarks' },
            grid: { drawOnChartArea: false },
          },
        },
      },
    });
    // Cleanup
    return () => { if (chartInstance.current) chartInstance.current.destroy(); };
  }, [state.users, state.bookmarks]);

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 32 }}>
      <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Analytics</h2>
      <canvas ref={chartRef} height={350} />
    </div>
  );
};

export default Analytics;
