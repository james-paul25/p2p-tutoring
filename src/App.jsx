import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';

import StudentLayout from './layout/StudentLayout';
import Home from './pages/student/Home';
import Profile from './pages/Profile';
import Message from './pages/student/Message';
import Session from './pages/student/Session';

import TutorLayout from './layout/TutorLayout'; 
import TutorHome from './pages/tutor/HomeTutor';
import TutorMessage from './pages/tutor/TutorMessage';
import TutorSession from './pages/tutor/TutorSession';

import { fetchAllTutors } from './services/tutorService';
import { fetchAllProfilePicture } from './services/profilePictureService';
import { getStudentInfo } from './services/studentService';
import { getSessionByStudent } from './services/sessionService';

{/* can access both tutors and students */}
import Tutors from './pages/Tutors';

function App() {
  const [loggedIn, setLoggedIn] = useState(null);
  const [userData, setUserData] = useState(null);

  const [tutors, setTutors] = useState([]);
  const [studentSession, setStudentSession] = useState([]);
  const [profilePictures, setProfilePictures] = useState([]);
  const [studentInfo, setStudentInfo] = useState([]);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [recent, student, pictures] = await Promise.all([
          fetchAllTutors(),
          getStudentInfo(userData.userId),
          fetchAllProfilePicture(),
        ]);

        const session = await getSessionByStudent(student.studentId);

        setTutors(recent);
        setStudentSession(session);
        setProfilePictures(pictures);
        setStudentInfo(student);
      } catch (error) {
        console.error("Fetching error:", error);
      }
    };
    
    if (loggedIn && userData) {
      fetchData();
    }
    
  }, [loggedIn, userData]);

  console.log("pp", profilePictures);

  

  if (loggedIn === null || (loggedIn && !userData)) {
    return <p className="p-4">Checking session...</p>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={loggedIn ? "/home" : "/login"} replace />}
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

         {/* student */}
        {loggedIn && userData?.role === 'STUDENT' && (
          <Route element={<StudentLayout onLogout={handleLogout} user={userData} />}>
            <Route path="/home" element={<Home
              user={userData}
              tutors={tutors}
              profilePictures={profilePictures}
              session={studentSession}
            />} />
            <Route path="/profile" element={<Profile user={userData} />} />
            <Route path="/message" element={<Message user={userData} />} />
            <Route path="/session" element={<Session user={userData} />} />
            <Route path="/tutors" element={<Tutors user={userData} />} />
          </Route>
        )}

        {/* tutor */}
        {loggedIn && userData?.role === 'TUTOR' && (
          <Route element={<TutorLayout onLogout={handleLogout} user={userData} />}>
            <Route path="/home" element={<TutorHome user={userData} />} />
            <Route path="/profile" element={<Profile user={userData} />} />
            <Route path="/message" element={<TutorMessage user={userData} />} />
            <Route path="/session" element={<TutorSession user={userData} />} />
            <Route path="/tutors" element={<Tutors user={userData} />} />
          </Route>
        )}

        {/* fallback for unauthorized access */}
        {!loggedIn && (
          <>
            <Route path="/home" element={<Navigate to="/login" />} />
            <Route path="/profile" element={<Navigate to="/login" />} />
            <Route path="/message" element={<Navigate to="/login" />} />
            <Route path="/session" element={<Navigate to="/login" />} />
            <Route path="/tutors" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
