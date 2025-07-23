import React, { useState, useMemo } from "react";
import { Users } from "lucide-react";
import TutorCard from "../components/TutorCard";
import TutorProfileModal from "../modals/TutorProfileModal";
import Avatar from "../assets/prof.jpg";
import SearchBar from "../components/SearchBar";
import FilterDropdown from "../components/FilterDropdown";
import { debounce } from "../utils/debounce";
import { Heart, Star } from "lucide-react";
import LeaderboardModal from "../modals/LeaderboardModal";

const Tutors = ({ user, tutors, profilePictures }) => {
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [selectedTutorImage, setSelectedTutorImage] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const debouncedChangeHandler = useMemo(
    () =>
      debounce((value) => {
        setDebouncedSearch(value);
      }, 400),
    []
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    debouncedChangeHandler(e.target.value);
  };

  const filteredTutors = tutors.filter((tutor) => {
    const fullName = `${tutor.student.firstName} ${tutor.student.lastName}`.toLowerCase();
    const subject = tutor.subject?.subjectDescription?.toLowerCase() || "";
    const department = tutor.student?.department?.departmentName?.toLowerCase() || "";

    const combinedFields = `${fullName} ${subject} ${department}`;
    const matchesSearch = combinedFields.includes(debouncedSearch.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" || tutor.status === statusFilter;

    return matchesSearch && matchesStatus;
  });


  const statusOptions = [
    { value: "ALL", label: "Status" },
    { value: "PENDING", label: "Pending" },
    { value: "APPROVED", label: "Approved" },
    { value: "REJECTED", label: "Rejected" },
  ];

  return (
    <>
      <div
        className={`bg-white p-6 rounded-lg shadow-md space-y-10 transition ${selectedTutor ? "blur-sm pointer-events-none select-none" : ""
          }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Users className="text-purple-600 w-6 h-6" />
            <h1 className="text-2xl font-bold text-gray-800">All Tutors</h1>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <button
              onClick={() => setShowLeaderboard(true)}
              className="transition"
            >
              <Star className="w-5 h-5 text-yellow-400 hover:fill-yellow-400 hover:text-yellow-400 cursor-pointer" />
            </button>

            <button
              onClick={() => console.log("Heart clicked")}
              className="transition"
            >
              <Heart className="w-5 h-5 text-pink-500 hover:fill-pink-500 hover:text-pink-500 cursor-pointer" />
            </button>
            <SearchBar
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search tutors..."
            />
            <FilterDropdown
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={statusOptions}
              label="Status"
            />
          </div>
        </div>

        {filteredTutors.length === 0 ? (
          <p className="text-gray-600 mt-4">No tutors match your search or filter.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredTutors
              .filter((tutor) => tutor?.user?.userId !== user?.userId)
              .map((tutor) => {
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
          userInfo={user}
          tutor={selectedTutor}
          imageUrl={selectedTutorImage}
          onClose={() => setSelectedTutor(null)}
        />
      )}
      {showLeaderboard && (
        <LeaderboardModal
          user={user}
          onClose={() => setShowLeaderboard(false)}
        />
      )}
    </>
  );
};

export default Tutors;
