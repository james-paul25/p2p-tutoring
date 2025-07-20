import React, { useState } from "react";
import { X } from "lucide-react";

const RateModal = ({ tutor, onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (rating === 0) return alert("Please select a rating.");
    onSubmit({ rating, comment });
    onClose(); // Close after submission
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X />
        </button>
        <h2 className="text-xl font-semibold mb-4 text-center">Rate Your Tutor</h2>
        <p className="text-center mb-2 text-gray-700">
          {tutor.fullName}
        </p>

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

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Leave a comment (optional)"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          rows={3}
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Submit Rating
        </button>
      </div>
    </div>
  );
};

export default RateModal;
