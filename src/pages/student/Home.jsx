import React, { useState, useEffect } from "react";
import {
  Users,
  Star,
  Heart,
  BookOpen,
  GraduationCap,
} from "lucide-react";
import { Link } from "react-router-dom";
import TutorProfileModal from "../../modals/TutorProfileModal";
import SessionModal from "../../modals/SessionModal";
import { getRecentTutors } from "../../services/tutorService";
import { getSessionByStudent } from "../../services/sessionService";
// dummy profile
import Avatar from "../../assets/prof.jpg"

const dummyTutors = [
];

const Home = ({ user }) => {
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);
  const [recentTutors, setRecentTutors] = useState([]);
  const [studentSession, setStudentSession] = useState([]);

  const recommendedSubjects = ["Calculus", "Data Structures", "Physics"];
  const favoriteTutors = dummyTutors;
  const topTutors = dummyTutors.sort((a, b) => b.rating - a.rating);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [recent, session] = await Promise.all([
          getRecentTutors(),
          getSessionByStudent(),
        ]);
  
        setRecentTutors(recent);
        setStudentSession(session);
      } catch (error) {
        console.error("Fetching error:", error);
      }
    };
  
    fetchData();
  }, []);

  console.log("tutors: ", recentTutors)

  return (
    <>
      {/* Main Content */}
      <div
        className={`bg-white p-6 rounded-lg shadow-md space-y-10 transition ${
          selectedTutor || selectedSession ? "blur-sm pointer-events-none select-none" : ""
        }`}
      >
        {/* Current Sessions */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <GraduationCap className="text-purple-600 w-5 h-5" />
            <h2 className="text-xl font-semibold text-gray-800">Current Sessions</h2>
          </div>
          {studentSession.length === 0 ? (
            <p className="text-gray-600 text-sm">
              No upcoming sessions. Book a tutor now!
            </p>
          ) : (
            <div className="flex flex-col gap-4">
              {studentSession.map((session) => (
                <div
                  key={session.id}
                  onClick={() => setSelectedSession(session)}
                  className="cursor-pointer bg-purple-100 p-4 rounded-lg flex gap-4 items-center hover:bg-purple-200"
                >
                  <img
                    src={session.avatar}
                    alt={session.tutorName}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold text-purple-900">{session?.tutor?.student?.fullName}</h3>
                    <p className="text-sm text-purple-800">
                      {session?.subject?.subjectDescription} – {session?.sessionTime}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Recent Tutors */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Users className="text-blue-600 w-5 h-5" />
              <h2 className="text-xl font-semibold text-gray-800">Recent Tutors</h2>
            </div>
            <Link to="/tutors" className="text-sm text-blue-600 hover:underline">
              See all
            </Link>
          </div>
          {recentTutors.length === 0 ? (
            <p className="text-gray-600 text-sm">
              No recent tutors. Book a session with the best tutor of your choice.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {recentTutors.map((tutor) => (
                <div
                  key={tutor.tutorId}
                  onClick={() => setSelectedTutor(tutor)}
                  className="bg-white shadow rounded-lg p-4 flex gap-4 cursor-pointer hover:bg-gray-50"
                >
                  <img
                    src={Avatar}
                    alt={tutor?.student?.firstName}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800">{tutor?.student?.firstName}</h3>
                    <p className="text-sm text-gray-600"><strong>Subject: </strong>{tutor?.subject?.subjectDescription}</p>
                    <p className="text-sm text-gray-600"><strong>Status: </strong>{tutor?.status}</p>
                    <p className="text-sm text-yellow-600">Year Level: {tutor?.student?.yearLevel}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Favorite Tutors */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Heart className="text-pink-600 w-5 h-5" />
              <h2 className="text-xl font-semibold text-gray-800">Your Favorites</h2>
            </div>
            <Link to="/tutors" className="text-sm text-pink-600 hover:underline">
              See all
            </Link>
          </div>
          {favoriteTutors.length === 0 ? (
            <p className="text-gray-600 text-sm">
              No favorites yet. Book a session and mark a tutor as favorite.
            </p>
          ) : (
            <div className="flex gap-4 overflow-x-auto pb-1">
              {favoriteTutors.map((tutor) => (
                <div
                  key={tutor.id}
                  onClick={() => setSelectedTutor(tutor)}
                  className="min-w-[220px] bg-pink-100 rounded-lg p-4 flex items-center gap-3 cursor-pointer hover:bg-pink-200"
                >
                  <img
                    src={tutor.avatar}
                    alt={tutor.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="font-medium text-pink-900">{tutor.name}</h3>
                    <p className="text-sm text-pink-700">{tutor.subject}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Top-Rated Tutors */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Star className="text-yellow-500 w-5 h-5" />
              <h2 className="text-xl font-semibold text-gray-800">Top-Rated Tutors</h2>
            </div>
            <Link to="/tutors" className="text-sm text-yellow-600 hover:underline">
              See all
            </Link>
          </div>
          {topTutors.length === 0 ? (
            <p className="text-gray-600 text-sm">
              No top-rated tutors yet. Book a session and rate your tutor.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {topTutors.map((tutor) => (
                <div
                  key={tutor.id}
                  onClick={() => setSelectedTutor(tutor)}
                  className="bg-yellow-100 p-4 rounded-lg shadow flex gap-4 cursor-pointer hover:bg-yellow-200"
                >
                  <img
                    src={tutor.avatar}
                    alt={tutor.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-yellow-900">{tutor.name}</h3>
                    <p className="text-sm text-yellow-800">
                      ⭐ {tutor.rating} – {tutor.subject}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Recommended Subjects */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="text-indigo-600 w-5 h-5" />
            <h2 className="text-xl font-semibold text-gray-800">
              Recommended for {user?.department || "your department"}
            </h2>
          </div>
          <div className="flex gap-3 flex-wrap">
            {recommendedSubjects.map((subject, i) => (
              <div
                key={i}
                className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg shadow"
              >
                {subject}
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Modals OUTSIDE the blurred container */}
      {selectedTutor && (
        <TutorProfileModal
          tutor={selectedTutor}
          onClose={() => setSelectedTutor(null)}
        />
      )}
      {selectedSession && (
        <SessionModal
          session={selectedSession}
          onClose={() => setSelectedSession(null)}
        />
      )}
    </>
  );
};

export default Home;
