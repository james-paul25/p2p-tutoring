import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/student/Home";
import StudentLayout from "./layout/StudentLayout"; 

function App() {
  const [loggedIn, setLoggedIn] = useState(null);

  useEffect(() => {
    const check = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/auth/check', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
        }
      } catch (e) {
        console.error("Auth check failed", e);
        setLoggedIn(false);
      }
    };

    check();
  }, []);

  const handleLogout = async () => {
    await fetch("http://localhost:8080/api/v1/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    setLoggedIn(false);
  };

  if (loggedIn === null) {
    return <p className="p-4">Checking session...</p>;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* redirect root path */}
        <Route
          path="/"
          element={
            loggedIn ? (
              <Navigate to="/home" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/login"
          element={
            loggedIn ? (
              <Navigate to="/home" replace />
            ) : (
              <Login onLogin={() => setLoggedIn(true)} />
            )
          }
        />
        <Route
          path="/signup"
          element={
            loggedIn ? (
              <Navigate to="/home" replace />
            ) : (
              <Register />
            )
          }
        />
        {/* student-protected routes inside layout */}
        <Route
          path="/home"
          element={
            loggedIn ? (
              <StudentLayout onLogout={handleLogout}>
                <Home />
              </StudentLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* You can add more student routes below using the same layout: */}
        {/* <Route path="/messages" element={...} /> */}
        {/* <Route path="/settings" element={...} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
