import React, { useState } from "react";
import { X } from "lucide-react";
import Avatar from "../assets/prof.jpg"
import { useOutsideClick } from "../utils/useOutsideClick";
import RequestSessionModal from "./RequestSessionModal";

const TutorProfileModal = ({ userInfo, tutor, imageUrl, onClose }) => {

  const [showRequestModal, setShowRequestModal] = useState(false);


  useOutsideClick("tutorProfileModalBackdrop", onClose);

  if (!tutor) return null;


  return (
    <>
      <div
        id="tutorProfileModalBackdrop"
        className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-sm"
      >
        <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
          <button
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex flex-col items-center text-center">
            <img
              src={imageUrl || Avatar}
              alt={tutor?.student?.firstName}
              className="w-24 h-24 rounded-full object-cover mb-3"
            />
            <h2 className="text-xl font-bold text-gray-800 mb-1">{tutor?.student?.fullName}</h2>
            <p className="text-sm text-gray-600 font-medium"><strong>Department: </strong>{tutor?.student?.department?.departmentName || "N/A"}</p>
          </div>

          <div className="mt-4 border-t pt-4 text-sm text-gray-700 space-y-2">
            <p><strong>Email:</strong> {tutor?.user?.email || "tutor@example.com"}</p>
            <p className="text-sm text-gray-600 mb-2"><strong>Subject: </strong>{tutor?.subject?.subjectDescription}</p>
            <p><strong>Bio:</strong> {tutor?.student?.bio || "N/A"}</p>
          </div>

          <div className="mt-6 flex justify-between items-center">
            <button
              onClick={() => setShowRequestModal(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
            >
              Request Session
            </button>

            <button
              onClick={onClose}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md"
            >
              Close
            </button>
          </div>


        </div>
      </div>

      {showRequestModal && (
        <RequestSessionModal
          user={userInfo}
          tutor={tutor}
          onClose={() => setShowRequestModal(false)}
        />
      )}

    </>
  );
};

export default TutorProfileModal;
