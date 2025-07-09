import React, { useState } from "react";
import {
  Users,
  Star,
  Heart,
  BookOpen,
  GraduationCap,
} from "lucide-react";
import { Link } from "react-router-dom";
import TutorProfileModal from "../../modals/TutorProfileModal";

// Dummy data
const dummyTutors = [
  {
    id: 1,
    name: "John Doe",
    subject: "Mathematics",
    avatar: "https://i.pravatar.cc/150?img=3",
    rating: 4.7,
    email: "john.doe@example.com",
    experience: "3 years",
  },
  {
    id: 2,
    name: "Jane Smith",
    subject: "Physics",
    avatar: "https://i.pravatar.cc/150?img=5",
    rating: 4.9,
    email: "jane.smith@example.com",
    experience: "5 years",
  },
  {
    id: 3,
    name: "Mike Johnson",
    subject: "Chemistry",
    avatar: "https://i.pravatar.cc/150?img=8",
    rating: 4.6,
    email: "mike.johnson@example.com",
    experience: "2 years",
  },
];

// Dummy current sessions
const dummySessions = [
  {
    id: 1,
    tutorName: "John Doe",
    subject: "Mathematics",
    time: "Today at 3:00 PM",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
];

const Home = ({ user }) => {
  const [selectedTutor, setSelectedTutor] = useState(null);

  const recommendedSubjects = ["Calculus", "Data Structures", "Physics"];
  const recentTutors = dummyTutors;
  const favoriteTutors = dummyTutors;
  const topTutors = dummyTutors.sort((a, b) => b.rating - a.rating);
  const sessions = dummySessions;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-10">
      {/* Current Sessions */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <GraduationCap className="text-purple-600 w-5 h-5" />
          <h2 className="text-xl font-semibold text-gray-800">Current Sessions</h2>
        </div>
        {sessions.length === 0 ? (
          <p className="text-gray-600 text-sm">
            No upcoming sessions. Book a tutor now!
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {sessions.map((session) => (
              <div key={session.id} className="bg-purple-100 p-4 rounded-lg flex gap-4 items-center">
                <img
                  src={session.avatar}
                  alt={session.tutorName}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="font-semibold text-purple-900">{session.tutorName}</h3>
                  <p className="text-sm text-purple-800">{session.subject} – {session.time}</p>
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
        <Link to="/tutors" className="text-sm text-blue-600 hover:underline">See all</Link>
      </div>
        {recentTutors.length === 0 ? (
          <p className="text-gray-600 text-sm">
            No recent tutors. Book a session with the best tutor of your choice.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {recentTutors.map((tutor) => (
              <div
                key={tutor.id}
                onClick={() => setSelectedTutor(tutor)}
                className="bg-white shadow rounded-lg p-4 flex gap-4 cursor-pointer hover:bg-gray-50"
              >
                <img
                  src={tutor.avatar}
                  alt={tutor.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-800">{tutor.name}</h3>
                  <p className="text-sm text-gray-600">Subject: {tutor.subject}</p>
                  <p className="text-sm text-yellow-600">⭐ {tutor.rating}</p>
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
        <Link to="/tutors" className="text-sm text-pink-600 hover:underline">See all</Link>
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
        <Link to="/tutors" className="text-sm text-yellow-600 hover:underline">See all</Link>
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

      {/* Modal */}
      {selectedTutor && (
        <TutorProfileModal
          tutor={selectedTutor}
          onClose={() => setSelectedTutor(null)}
        />
      )}
    </div>
  );
};

export default Home;
