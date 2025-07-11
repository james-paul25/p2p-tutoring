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
import { fetchAllTutors } from "../../services/tutorService";
import { getSessionByStudent } from "../../services/sessionService";
import { getStudentInfo } from "../../services/studentService";
import { fetchAllProfilePicture } from "../../services/profilePictureService";
// dummy profile
import Avatar from "../../assets/prof.jpg"

import TutorCard from "../../components/TutorCard";
import SessionCard from "../../components/SessionCard";

const dummyTutors = [
];

const Home = ({ user }) => {
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);
  const [recentTutors, setRecentTutors] = useState([]);
  const [studentSession, setStudentSession] = useState([]);
  const [profilePictures, setProfilePictures] = useState([]);
  const [selectedTutorImage, setSelectedTutorImage] = useState(null);

  const recommendedSubjects = ["Calculus", "Data Structures", "Physics"];
  const favoriteTutors = dummyTutors;
  const topTutors = dummyTutors.sort((a, b) => b.rating - a.rating);

  useEffect(() => {
    if (!user?.userId) return;

    const fetchData = async () => {
      try {
        const [recent, student, pictures] = await Promise.all([
          fetchAllTutors(),
          getStudentInfo(user.userId),
          fetchAllProfilePicture(),
        ]);
  
        const session = await getSessionByStudent(student.studentId);
  
        setRecentTutors(recent);
        setStudentSession(session);
        setProfilePictures(pictures);
      } catch (error) {
        console.error("Fetching error:", error);
      }
    };
  
    fetchData();
  }, [user.userId]);

  console.log("user: ",user)
  console.log("tutors: ", recentTutors);
  console.log("session: ", studentSession);

  return (
    <>
      <div
        className={`bg-white p-6 rounded-lg shadow-md space-y-10 transition ${
          selectedTutor || selectedSession ? "blur-sm pointer-events-none select-none" : ""
        }`}
      >
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
                <SessionCard
                  key={session.id}
                  session={session}
                  profilePictures={profilePictures}
                  onClick={() => setSelectedSession(session)}
                />
              ))}
            </div>
          )}
        </section>

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
              {recentTutors.map((tutor) => {
                const matchedPic = profilePictures.find(
                  (pic) => pic?.user?.userId === tutor?.user?.userId
                );

                const imageUrl =  matchedPic ? `http://localhost:8080${matchedPic.filePath}` : Avatar;

                return (
                  <TutorCard
                    key={tutor?.tutorId}
                    tutor={tutor}
                    imageUrl={imageUrl}
                    onClick={() => {
                      setSelectedTutor(tutor);
                      setSelectedTutorImage(imageUrl);
                    }}
                    variant="default"
                  />
                );
              })}

            </div>
          )}
        </section>

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
              {favoriteTutors.map((tutor) => {
                const matchedPic = profilePictures.find(
                  (pic) => pic?.user?.userId === tutor?.user?.userId
                );
                const imageUrl = matchedPic ? `http://localhost:8080${matchedPic.filePath}` : Avatar;

                return (
                  <div key={tutor.id} className="min-w-[220px]">
                    <TutorCard
                      tutor={tutor}
                      imageUrl={imageUrl}
                      onClick={() => {
                        setSelectedTutor(tutor);
                        setSelectedTutorImage(imageUrl);
                      }}
                      variant="favorite"
                    />
                  </div>
                );
              })}
            </div>
          )}
        </section>

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
              {topTutors.map((tutor) => {
                const matchedPic = profilePictures.find(
                  (pic) => pic?.user?.userId === tutor?.user?.userId
                );
                const imageUrl = matchedPic ? `http://localhost:8080${matchedPic.filePath}` : Avatar;

                return (
                  <TutorCard
                    key={tutor.id}
                    tutor={tutor}
                    imageUrl={imageUrl}
                    onClick={() => {
                      setSelectedTutor(tutor);
                      setSelectedTutorImage(imageUrl);
                    }}
                    variant="topRated"
                  />
                );
              })}
            </div>
          )}
        </section>

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

      {selectedTutor && (
        <TutorProfileModal
          userInfo={user}
          tutor={selectedTutor}
          imageUrl={selectedTutorImage}
          onClose={() => setSelectedTutor(null)}
        />
      )}
      {selectedSession && (
        <SessionModal
          session={selectedSession}
          profilePictures={profilePictures}
          onClose={() => {
            setSelectedSession(null);
            setSelectedTutorImage(null);
          }}
        />
      )}
    </>
  );
};

export default Home;
