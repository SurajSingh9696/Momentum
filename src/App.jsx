import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Landing from './pages/Landing';
import Authentication from './pages/Authentication';
import Dashboard from './pages/Dashboard';
import Challenges from './pages/Challenges';
import Community from './pages/Community';
import Profile from './pages/Profile';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Authentication />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/challenges" element={<Challenges />} />
          <Route path="/community" element={<Community />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
