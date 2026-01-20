
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Search from './pages/Search';
import Profile from './pages/Profile';
import Points from './pages/Points';
import Messages from './pages/Messages';
import Auth from './pages/Auth';
import { currentUser as mockUser } from './data/mockData';
import { User } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Check local storage for persistent session
    const savedUser = localStorage.getItem('mubadala_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsReady(true);
  }, []);

  const handleLogin = (userData: any) => {
    // In a real app, this comes from backend. For now, merge with mock data.
    const fullUser = { ...mockUser, ...userData };
    setUser(fullUser);
    localStorage.setItem('mubadala_user', JSON.stringify(fullUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('mubadala_user');
  };

  if (!isReady) return null;

  return (
    <Routes>
      <Route 
        path="/auth" 
        element={!user ? <Auth onLogin={handleLogin} /> : <Navigate to="/" />} 
      />
      
      <Route path="/" element={user ? <Layout onLogout={handleLogout}><Home /></Layout> : <Navigate to="/auth" />} />
      <Route path="/search" element={user ? <Layout onLogout={handleLogout}><Search /></Layout> : <Navigate to="/auth" />} />
      <Route path="/profile" element={user ? <Layout onLogout={handleLogout}><Profile /></Layout> : <Navigate to="/auth" />} />
      <Route path="/points" element={user ? <Layout onLogout={handleLogout}><Points /></Layout> : <Navigate to="/auth" />} />
      <Route path="/messages" element={user ? <Layout onLogout={handleLogout}><Messages /></Layout> : <Navigate to="/auth" />} />
    </Routes>
  );
};

export default App;
