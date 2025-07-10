import React, { useEffect, useState } from "react";
import { Users } from "lucide-react";
import TutorCard from "../components/TutorCard";
import TutorProfileModal from "../modals/TutorProfileModal";
import { fetchAllTutors } from "../services/tutorService";
import { fetchAllProfilePicture } from "../services/profilePictureService";
import Avatar from "../assets/prof.jpg";

import SearchBar from "../components/SearchBar";
import FilterDropdown from "../components/FilterDropdown";

const Tutors = ({ user }) => {
  const [tutors, setTutors] = useState([]);
  const [profilePictures, setProfilePictures] = useState([]);
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [selectedTutorImage, setSelectedTutorImage] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

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

  const filteredTutors = tutors.filter((tutor) => {
    const fullName = `${tutor.firstName} ${tutor.lastName}`.toLowerCase();
    const matchesName = fullName.includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "ALL" || tutor.status === statusFilter;

    return matchesName && matchesStatus;
  });

  const statusOptions = [
    { value: "ALL", label: "All Statuses" },
    { value: "PENDING", label: "Pending" },
      { value: "APPROVED", label: "Approved" },
      { value: "REJECTED", label: "Rejected" },
  ];

    console.log(user);
  return (
    <>
      <div
        className={`bg-white p-6 rounded-lg shadow-md space-y-10 transition ${
          selectedTutor ? "blur-sm pointer-events-none select-none" : ""
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Users className="text-blue-600 w-6 h-6" />
            <h1 className="text-2xl font-bold text-gray-800">All Tutors</h1>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <SearchBar
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search tutors by name..."
            />
            <FilterDropdown
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={statusOptions}
            />
          </div>
        </div>

        {filteredTutors.length === 0 ? (
          <p className="text-gray-600 mt-4">No tutors match your search or filter.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredTutors.map((tutor) => {
              const matchedPic = profilePictures.find(
                (pic) => pic?.user?.userId === tutor?.user?.userId
              );
              const imageUrl = matchedPic
                ? `http://localhost:8080${matchedPic.filePath}`
                : Avatar;

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
