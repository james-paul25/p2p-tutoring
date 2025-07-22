import React, { useState } from "react";
import { X } from "lucide-react";
import { useOutsideClick } from "../utils/useOutsideClick";
import { useEscapeClose } from "../utils/useEscapeClose";
import { rateTutor } from "../services/rateService";
import SuccessModal from "./SuccessModal";
import FailedModal from "./FailedModal";

const RateModal = ({ session, imageUrl, onClose }) => {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailedModal, setShowFailedModal] = useState(false);
  const [message, setMessage] = useState("");

  useOutsideClick("rateModalBackdrop", onClose);
  useEscapeClose(onClose);

  const handleSubmit = async () => {

    try {
      const response = await rateTutor({
        studentId: session?.student?.studentId,
        tutorId: session?.tutor?.tutorId,
        rating: rating
      })

      setMessage(response);
      setShowSuccessModal(true);

    } catch (e) {
      setMessage(e);
      setShowFailedModal(e);
    }

  };

  return (
    <>
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
                className={`text-3xl cursor-pointer ${(hovered || rating) >= star ? "text-yellow-400" : "text-gray-300"
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

      {showSuccessModal && (
        <SuccessModal
          message={message}
          onClose={() => {
            setShowSuccessModal(false);
          }}
        />
      )}
      {showFailedModal && (
        <FailedModal
          message={message}
          onClose={() => setShowFailedModal(false)}
        />
      )}
    </>
  );
};

export default RateModal;
