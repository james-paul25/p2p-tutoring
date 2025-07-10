import React, { useEffect, useState } from "react";
import { Users } from "lucide-react";
import TutorCard from "../components/TutorCard";
import { fetchAllTutors } from "../services/tutorService";
import { fetchAllProfilePicture } from "../services/profilePictureService";
import Avatar from "../assets/prof.jpg";
import TutorProfileModal from "../modals/TutorProfileModal";

const Tutors = ({ user }) => {
  const [tutors, setTutors] = useState([]);
  const [profilePictures, setProfilePictures] = useState([]);
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [selectedTutorImage, setSelectedTutorImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tutorsData, pictures] = await Promise.all([
          fetchAllTutors(),
          fetchAllProfilePicture(),
        ]);
        setTutors(tutorsData);
        setProfilePictures(pictures);
      } catch (error) {
        console.error("Error fetching tutors:", error);
      }
    };

    fetchData();
  }, []);
    
    console.log("selected image: ", selectedTutorImage);

  return (
    <>
    <div
        className={`bg-white p-6 rounded-lg shadow-md space-y-10 transition ${
          selectedTutor ? "blur-sm pointer-events-none select-none" : ""
        }`}
      >

      <div className="flex items-center gap-2 mb-6">
        <Users className="text-blue-600 w-6 h-6" />
        <h1 className="text-2xl font-bold text-gray-800">All Tutors</h1>
      </div>

      <div className="text-gray-700 space-y-1">
        <p>Logged in as: <span className="font-medium">{user?.username}</span></p>
        <p>Role: <span className="font-medium capitalize">{user?.role}</span></p>
      </div>

      {tutors.length === 0 ? (
        <p className="text-gray-600 mt-4">No tutors available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {tutors.map((tutor) => {
            const matchedPic = profilePictures.find(
              (pic) => pic?.user?.userId === tutor?.user?.userId
            );
            const imageUrl = matchedPic ? `http://localhost:8080${matchedPic.filePath}` : Avatar;

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
      </div>
      
      {selectedTutor && (
        <TutorProfileModal
          tutor={selectedTutor}
          imageUrl={selectedTutorImage}
          onClose={() => setSelectedTutor(null)}
        />
      )}
    </>
  );
};

export default Tutors;
