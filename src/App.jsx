import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Register from "./pages/Register";
import Home from "./pages/Home"
import Login from "./pages/Login";


function App() {

  const [loggedIn, setLoggedIn] = useState(null);

  const check = async () => {

    try {
      const response = await fetch('http://localhost:8080/api/v1/auth/check', {
        method: 'GET',
        credentials: 'include',
      })

      if (response.ok) {
        setLoggedIn(true);
      } else {
        throw new Error();
      }

    } catch (e) {
      console.log(e);
      if (loggedIn === null) return
      <p>Checking session...</p>
    }


  }

  useEffect(() => {
    check();
  });

  return (
    <BrowserRouter>
      <Routes>
      <Route
          path='/'
          element={
            loggedIn ? (
              <Navigate to="/home" replace />
            ) : ( <Navigate to="/login" replace />)
          }
        />
        <Route
          path='/login'
          element={
            loggedIn ? (
              <Navigate to="/home" replace/>
            ) : (<Login onLogin={ () => setLoggedIn(true)} />)
          }
        />
        <Route
          path='/home'
          element={
            loggedIn ? (
              <Home onLogout={() => setLoggedIn(false)} />
            ) : (<Navigate to="/login" />)
          }
        />
        <Route
          path='/signup'
          element={
            loggedIn ? (
              <Navigate to="/home" replace />
            ) : (
              <Register />
            )
          }
        />

      </Routes>
    </BrowserRouter>
  )
}

export default App;
