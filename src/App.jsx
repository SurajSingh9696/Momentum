import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import RippleEffect from './components/RippleEffect';

import Landing from './pages/Landing';
import Authentication from './pages/Authentication';
import Dashboard from './pages/Dashboard';
import Challenges from './pages/Challenges';
import Community from './pages/Community';
import Profile from './pages/Profile';

function AnimatedRoutes() {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                {/* Public standalone pages (have their own Header) */}
                <Route path="/" element={<Landing />} />
                <Route path="/auth" element={<Authentication />} />

                {/* App pages — all wrapped in shared Layout with Header + MobileNav.
            Auth is handled inside each page (Dashboard/Profile show a login prompt,
            Challenges/Community are publicly readable). */}
                <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
                <Route path="/challenges" element={<Layout><Challenges /></Layout>} />
                <Route path="/community" element={<Layout><Community /></Layout>} />
                <Route path="/profile" element={<Layout><Profile /></Layout>} />
            </Routes>
        </AnimatePresence>
    );
}

function App() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <Router>
                    <AnimatedRoutes />
                    <RippleEffect />
                </Router>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;
