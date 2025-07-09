import React from "react";
import { X } from "lucide-react";

const TutorProfileModal = ({ tutor, onClose }) => {
  if (!tutor) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
        {/* Close button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </button>

        {/* Avatar */}
        <div className="flex flex-col items-center text-center">
          <img
            src={tutor.avatar}
            alt={tutor.name}
            className="w-24 h-24 rounded-full object-cover mb-3"
          />
          <h2 className="text-xl font-bold text-gray-800 mb-1">{tutor.name}</h2>
          <p className="text-sm text-gray-600 mb-2">Subject: {tutor.subject}</p>
          <p className="text-sm text-yellow-600 font-medium">⭐ {tutor.rating} Rating</p>
        </div>

        {/* Additional info */}
        <div className="mt-4 border-t pt-4 text-sm text-gray-700 space-y-2">
          <p><strong>Experience:</strong> 3 years tutoring</p>
          <p><strong>Bio:</strong> Passionate about helping students learn {tutor.subject}. Friendly and supportive approach to learning.</p>
          <p><strong>Email:</strong> {tutor.email || "tutor@example.com"}</p>
        </div>

        {/* Optional CTA */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TutorProfileModal;
