import React from "react";

const SessionModal = ({ session, onClose }) => {
    if (!session) return null;
    

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-30 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>

        <div className="flex items-center gap-4 mb-4">
          <img
            src={session.avatar}
            alt={session.tutorName}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h2 className="text-xl font-bold text-gray-800">{session.tutorName}</h2>
            <p className="text-gray-600">{session.subject}</p>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-800">Time:</span> {session.time}
          </p>

          <p className="text-sm text-gray-600">
            Please be ready for your session on time. Check your email for the meeting link.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SessionModal;
