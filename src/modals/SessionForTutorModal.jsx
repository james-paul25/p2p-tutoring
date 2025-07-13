import React from "react";
import { useOutsideClick } from "../utils/useOutsideClick";
import Avatar from "../assets/prof.jpg";
import { formatDate, formatTime } from "../utils/formatDateTime";
import { statusTextColors } from "../utils/colors";

const SessionForTutorModal = ({ tutorSession, profilePictures, onClose }) => {
  useOutsideClick("tutorSessionModalBackdrop", onClose);
    
  const matchedPic = profilePictures.find(
      (pic) => pic?.user?.userId === tutorSession?.student?.user?.userId
    );
  
    const imageUrl = matchedPic
      ? `http://localhost:8080${matchedPic.filePath}`
      : Avatar;
  
  if (!tutorSession) return null;

  const status = tutorSession?.sessionStatus?.toUpperCase();
  const statusTextColor = statusTextColors[status] || statusTextColors.DEFAULT; 

  return (
    <div
      id="tutorSessionModalBackdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-sm"
    >
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md relative">
        <div className="flex items-center gap-4 mb-4">
          <img
            src={imageUrl}
            alt={tutorSession?.student?.firstName}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h2 className="text-xl font-bold text-gray-800">{tutorSession?.student?.fullName}</h2>
            <h6 className={`text-l font-bold ${statusTextColor}`}>{tutorSession?.sessionStatus}</h6>
            <p className="text-gray-600">{tutorSession?.subject?.subjectDescription} – { tutorSession?.topic }</p>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-800">Date:</span> {formatDate(tutorSession?.sessionDate)}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-800">Time:</span> {formatTime(tutorSession?.sessionTime)}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-800">Location:</span> dummy location
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-800">Notes:</span> {tutorSession.notes || "N/A"}
          </p>
        </div>

        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionForTutorModal;
