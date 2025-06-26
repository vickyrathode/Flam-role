import React from 'react';
import { AppProvider } from './context/AppContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import EmployeeDetails from './pages/EmployeeDetails';
import Bookmarks from './pages/Bookmarks';
import Analytics from './pages/Analytics';
import { useState } from 'react'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/employee/:id" element={<EmployeeDetails />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}

export default App
