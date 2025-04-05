import React, { useState, useEffect } from 'react';
import { BrowserRouter as BrowserRouter, HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import ForgotPassword from './components/ForgotPassword';
import Dashboard from './components/Dashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      setIsLoggedIn(true);
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  const handleLogin = (user) => {
    localStorage.setItem('currentUser', JSON.stringify(user));
    setIsLoggedIn(true);
    setCurrentUser(user);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  // Determine if we are on GitHub Pages
  const isGitHubPages = window.location.hostname === '2003manoj.github.io';

  // Conditionally set Router type based on environment
  const RouterComponent = isGitHubPages ? BrowserRouter : Router; // Use BrowserRouter for GitHub Pages and HashRouter for local development

  // For GitHub Pages, set basename to '/BrainDump', otherwise leave it empty for local
  const basename = isGitHubPages ? '/BrainDump' : '';

  return (
    <RouterComponent basename={basename}>  {/* Conditionally set Router and basename */}
      <div className="app">
        <Routes>
          <Route path="/login" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />} />
          <Route path="/signup" element={isLoggedIn ? <Navigate to="/dashboard" /> : <SignUp />} />
          <Route path="/forgot-password" element={isLoggedIn ? <Navigate to="/dashboard" /> : <ForgotPassword />} />
          <Route path="/dashboard" element={isLoggedIn ? <Dashboard user={currentUser} onLogout={handleLogout} /> : <Navigate to="/login" />} />
          <Route path="/" element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />} />
        </Routes>
      </div>
    </RouterComponent>
  );
}

export default App;
