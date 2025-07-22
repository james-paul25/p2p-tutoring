import React, { useState } from "react";
import { X } from "lucide-react";
import { useOutsideClick } from "../utils/useOutsideClick";
import { useEscapeClose } from "../utils/useEscapeClose";

const RateModal = ({ session, imageUrl, onClose }) => {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);

  useOutsideClick("rateModalBackdrop", onClose);
  useEscapeClose(onClose);

  const handleSubmit = () => {
    if (rating === 0) return alert("Please select a rating.");
    onClose();
  };

  return (
    <div
      id="rateModalBackdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X />
        </button>
        <div className="flex flex-col items-center mb-4">
          <img
            src={imageUrl}
            alt={session.tutor.student.firstName}
            className="w-16 h-16 rounded-full object-cover mb-2"
          />
          <p className="text-center text-gray-700">{session.tutor.student.fullName}</p>
        </div>

        <h2 className="text-xl font-semibold mb-4 text-center">Rate Your Tutor</h2>

        <div className="flex justify-center mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(0)}
              className={`text-3xl cursor-pointer ${
                (hovered || rating) >= star ? "text-yellow-400" : "text-gray-300"
              }`}
            >
              ★
            </span>
          ))}
        </div>
        <div className="flex justify-center mt-4">
          <button
            onClick={handleSubmit}
            className="w-fit px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Submit Rating
          </button>
        </div>


      </div>
    </div>
  );
};

export default RateModal;
