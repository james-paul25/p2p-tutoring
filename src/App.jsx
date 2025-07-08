import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import StudentLayout from './layout/StudentLayout';
import Home from './pages/student/Home';
import Profile from './pages/student/Profile';
import Message from './pages/student/Message'

function App() {
  const [loggedIn, setLoggedIn] = useState(null);

  useEffect(() => {
    const check = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/auth/check', {
          method: 'GET',
          credentials: 'include',
        });
        setLoggedIn(response.ok);
      } catch (e) {
        console.error("Session check failed", e);
        setLoggedIn(false);
      }
    };
    check();
  }, []);

  const handleLogout = async () => {
    await fetch('http://localhost:8080/api/v1/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });
    setLoggedIn(false);
  };

  if (loggedIn === null) return <p className="p-4">Checking session...</p>;

  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect base route */}
        <Route
          path="/"
          element={<Navigate to={loggedIn ? '/home' : '/login'} replace />}
        />

        {/* Auth routes */}
        <Route
          path="/login"
          element={loggedIn ? <Navigate to="/home" replace /> : <Login onLogin={() => setLoggedIn(true)} />}
        />
        <Route
          path="/signup"
          element={loggedIn ? <Navigate to="/home" replace /> : <Register />}
        />

        {/* Student routes inside layout */}
        {loggedIn && (
          <Route element={<StudentLayout onLogout={handleLogout} />}>
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/message" element={<Message />} />
          </Route>
        )}

        {/* Unauthorized fallback */}
        {!loggedIn && (
          <>
            <Route path="/home" element={<Navigate to="/login" />} />
            <Route path="/profile" element={<Navigate to="/login" />} />
            <Route path="/message" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
