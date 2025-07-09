import React, { useEffect } from "react";

const SessionModal = ({ session, onClose }) => {

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (e.target.id === "sessionModalBackdrop") {
        onClose();
      }
    };

    window.addEventListener("mousedown", handleOutsideClick);
    return () => window.removeEventListener("mousedown", handleOutsideClick);
  }, [onClose]);
    
  if (!session) return null;

  return (
    <div
      id="sessionModalBackdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-30 backdrop-blur-sm"
    >
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md relative">
        <div className="flex items-center gap-4 mb-4">
          <img
            src={session.avatar}
            alt={session.tutorName}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h2 className="text-xl font-bold text-gray-800">{session?.tutor?.student?.fullName}</h2>
            <p className="text-gray-600">{session?.subject?.subjectDescription}</p>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-800">Time:</span> {session?.sessionTime}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-800">Location:</span> dummy location
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-800">Notes:</span> {session.notes || "N/A"}
          </p>
          <p className="text-sm text-gray-600">
            Please be ready on time. Check your email for the session link.
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

export default SessionModal;
