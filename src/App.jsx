import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';

import StudentLayout from './layout/StudentLayout';
import Home from './pages/student/Home';
import Message from './pages/student/Message';
import Session from './pages/student/Session';

import TutorLayout from './layout/TutorLayout';
import TutorHome from './pages/tutor/HomeTutor';
import TutorMessage from './pages/tutor/TutorMessage';
import TutorSession from './pages/tutor/TutorSession';

import { fetchAllTutors, fetchTutorByUser } from './services/tutorService';
import { fetchAllProfilePicture, fetchProfilePicture } from './services/profilePictureService';
import { getStudentInfo } from './services/studentService';
import { getSessionByStudent, fetchSessionByTutor } from './services/sessionService';
import { fetchDepartment } from './services/departmentService'
import { fetchSubjects } from './services/subjectService';
import { fetchRates } from './services/rateService';

{/* can access both tutors and students */ }
import Tutors from './pages/Tutors';
import Profile from './pages/Profile';

function App() {
  const API_BASE_URL = import.meta.env.VITE_API_URL;
  const [loggedIn, setLoggedIn] = useState(null);
  const [userData, setUserData] = useState(null);

  const [tutors, setTutors] = useState([]);
  const [tutor, setTutor] = useState([]);
  const [studentSession, setStudentSession] = useState([]);
  const [profilePictures, setProfilePictures] = useState([]);
  const [studentInfo, setStudentInfo] = useState([]);
  const [ownProfilePicture, setOwnProfilePicture] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [tutorSession, setTutorSession] = useState([]);
  const [rates, setRates] = useState([]);

  useEffect(() => {
    const check = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/v1/auth/check`, {
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
  }, [API_BASE_URL]);

  const handleLogout = async () => {
    await fetch(`${API_BASE_URL}/api/v1/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    setLoggedIn(false);
    setUserData(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [recent, student, tutorInfo, pictures, department, subject, ratings] = await Promise.all([
          fetchAllTutors().catch((e) => {
            console.warn("Tutors fetch failed", e);
            return [];
          }),
          getStudentInfo(userData.userId).catch((e) => {
            console.warn("Student info fetch failed", e);
            return {};
          }),
          fetchTutorByUser(userData.userId).catch((e) => {
            console.warn("Tutor info fetch failed", e);
            return {};
          }),
          fetchAllProfilePicture().catch((e) => {
            console.warn("Pictures fetch failed", e);
            return [];
          }),
          fetchDepartment().catch((e) => {
            console.warn("Department fetch failed", e);
            return [];
          }),
          fetchSubjects().catch((e) => {
            console.warn("Subjects fetch failed", e);
            return [];
          }),
          fetchRates().catch((e) => {
            console.warn("Rates fetch failed", e);
            return [];
          }),
        ]);

        const studentSession = await getSessionByStudent(student?.studentId).catch((e) => {
          console.warn("Session fetch failed", e);
          return [];
        });

        const ownProfilePicture = await fetchProfilePicture(userData.userId).catch((e) => {
          console.warn("Own profile picture fetch failed", e);
          return null;
        });

        const tutorSession = await fetchSessionByTutor(tutorInfo?.tutorId).catch((e) => {
          console.warn("Session fetch failed", e);
          return [];
        });

        setTutors(recent);
        setStudentSession(studentSession);
        setProfilePictures(pictures);
        setStudentInfo(student);
        setOwnProfilePicture(ownProfilePicture);
        setDepartments(department);
        setSubjects(subject);
        setTutor(tutorInfo);
        setTutorSession(tutorSession);
        setRates(ratings);
      } catch (error) {
        console.error("Fetching error:", error);
      }
    };

    if (loggedIn && userData) {
      fetchData();
    }

  }, [loggedIn, userData]);

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
              subject={subjects}
              student={studentInfo}
              rates={rates}
            />} />
            <Route path="/profile" element={<Profile
              user={userData}
              student={studentInfo}
              profile={ownProfilePicture}
              departments={departments}
            />} />
            <Route path="/message" element={<Message
              sessions={studentSession}
              profilePictures={profilePictures}
            />} />
            <Route path="/session" element={<Session
              user={userData}
              session={studentSession}
              profilePictures={profilePictures}
            />} />
            <Route path="/tutors" element={<Tutors
              user={userData}
              tutors={tutors}
              profilePictures={profilePictures}
            />} />
          </Route>
        )}

        {/* tutor */}
        {loggedIn && userData?.role === 'TUTOR' && (
          <Route element={<TutorLayout onLogout={handleLogout} user={userData} />}>
            <Route path="/home" element={<TutorHome
              user={userData}
              tutors={tutors}
              profilePictures={profilePictures}
              session={tutorSession}
              subject={subjects}
              student={studentInfo}
              tutor={tutor}
              rates={rates}
            />} />
            <Route path="/profile" element={<Profile
              user={userData}
              student={studentInfo}
              profile={ownProfilePicture}
              departments={departments}
            />} />
            <Route path="/message" element={<TutorMessage
              sessions={tutorSession}
              profilePictures={profilePictures}
            />} />
            <Route path="/session" element={<TutorSession
              user={userData}
              sessions={tutorSession}
              profilePictures={profilePictures}
            />} />
            <Route path="/tutors" element={<Tutors
              user={userData}
              tutors={tutors}
              profilePictures={profilePictures}
              departments={departments}
            />} />
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
