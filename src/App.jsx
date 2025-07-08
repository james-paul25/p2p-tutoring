import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import StudentLayout from './layout/StudentLayout';
import Home from './pages/student/Home';
import Profile from './pages/student/Profile';
import Message from './pages/student/Message';

function App() {
  const [loggedIn, setLoggedIn] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const check = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/auth/check', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json(); 
          setLoggedIn(true);
          setUserData(data); 
        } else {
          setLoggedIn(false);
        }
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
    setUserData(null);
  };

  if (loggedIn === null || (loggedIn && !userData)) {
    return <p className="p-4">Checking session...</p>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={loggedIn ? '/home' : '/login'} replace />}
        />

        <Route
          path="/login"
          element={
            loggedIn ? (
              <Navigate to="/home" replace />
            ) : (
              <Login
                onLogin={(data) => {
                  setLoggedIn(true);
                  setUserData(data);
                }}
              />
            )
          }
        />
        <Route
          path="/signup"
          element={loggedIn ? <Navigate to="/home" replace /> : <Register />}
        />

        {loggedIn && userData && (
          <Route element={<StudentLayout onLogout={handleLogout} user={userData} />}>
            <Route path="/home" element={<Home user={userData} />} />
            <Route path="/profile" element={<Profile user={userData} />} />
            <Route path="/message" element={<Message user={userData} />} />
          </Route>
        )}

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
