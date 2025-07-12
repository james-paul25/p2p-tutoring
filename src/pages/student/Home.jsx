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
import SessionModal from "../../modals/SessionModal";
import ApplyAsTutorModal from "../../modals/ApplyAsTutorModal";
// dummy profile
import Avatar from "../../assets/prof.jpg"

import TutorCard from "../../components/TutorCard";
import SessionCard from "../../components/SessionCard";

const dummyTutors = [
];

const Home = ({ user, tutors, profilePictures, session, subject, student }) => {
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);
  const [selectedTutorImage, setSelectedTutorImage] = useState(null);
  const [applyButton, setApplyButton] = useState(false);

  const recommendedSubjects = ["Calculus", "Data Structures", "Physics"];
  const favoriteTutors = dummyTutors;
  const topTutors = dummyTutors.sort((a, b) => b.rating - a.rating);

  console.log("user: ",user)
  console.log("profile pictures", profilePictures);

  return (
    <>
      <div
        className={`bg-white p-6 rounded-lg shadow-md space-y-10 transition ${
          selectedTutor || selectedSession ? "blur-sm pointer-events-none select-none" : ""
        }`}
      >
        <section>
          <div className="flex items-center justify-between mb-3">
             <div className="flex items-center gap-2">
              <GraduationCap className="text-purple-600 w-5 h-5" />
              <h2 className="text-xl font-semibold text-gray-800">Sessions</h2>
            </div>
            <Link to="/session" className="text-sm text-blue-600 hover:underline">
              See all
            </Link>
          </div>
          {session.length === 0 ? (
            <p className="text-gray-600 text-sm">
              No upcoming sessions. Book a tutor now!
            </p>
          ) : (
            <div className="flex flex-col gap-4">
              {session.slice(0,3).map((session) => (
                <SessionCard
                  key={session?.sessionId}
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
          {tutors.length === 0 ? (
            <p className="text-gray-600 text-sm">
              No recent tutors. Book a session with the best tutor of your choice.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {tutors.slice(0,6).map((tutor) => {
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
            {recommendedSubjects.map((sub, i) => (
              <div
                key={i}
                className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg shadow"
              >
                {sub}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6">
          <div className="bg-gray-100 p-6 rounded-lg flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-1">
                Want to become a Tutor?
              </h2>
              <p className="text-sm text-gray-600">
                Share your knowledge and help others while earning experience.
              </p>
            </div>
            <button
              onClick={() => setApplyButton(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium"

            >
              Apply as Tutor
            </button>
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
          }}
        />
      )}
      {applyButton && (
        <ApplyAsTutorModal
          user={user}
          student={student}
          subject={subject}
          onClose={() => {
            setApplyButton(false);
          }}
        />
      )}
    </>
  );
};

export default Home;
