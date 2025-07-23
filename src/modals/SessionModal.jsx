import React, { useState } from "react";
import { useOutsideClick } from "../utils/useOutsideClick";
import Avatar from "../assets/prof.jpg";
import { formatDate, formatTime } from "../utils/formatDateTime";
import { statusTextColors } from "../utils/colors";
import { useEscapeClose } from "../utils/useEscapeClose";
import RateModal from "./RateModal";

const SessionModal = ({ session, profilePictures, onClose }) => {
  useOutsideClick("sessionModalBackdrop", onClose);
  useEscapeClose(onClose);

  const API_BASE_URL = import.meta.env.VITE_API_URL;
  const [showRateModal, setShowRateModal] = useState(false);

  const matchedPic = profilePictures.find(
    (pic) => pic?.user?.userId === session?.tutor?.user?.userId
  );

  const imageUrl = matchedPic
    ? `${API_BASE_URL}${matchedPic.filePath}`
    : Avatar;

  if (!session) return null;

  const status = session?.sessionStatus?.toUpperCase();
  const statusTextColor = statusTextColors[status] || statusTextColors.DEFAULT;

  return (
    <>
      <div
        id="sessionModalBackdrop"
        className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-sm"
      >
        <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md relative">
          <div className="flex items-center gap-4 mb-4">
            <img
              src={imageUrl}
              alt={session.tutor.student.firstName}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h2 className="text-xl font-bold text-gray-800">{session?.tutor?.student?.fullName}</h2>
              <h6 className={`text-l font-bold ${statusTextColor}`}>{session?.sessionStatus}</h6>
              <p className="text-gray-600">{session?.subject?.subjectDescription} – {session?.topic}</p>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-gray-800">Date:</span> {formatDate(session?.sessionDate)}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-gray-800">Start Time:</span> {formatTime(session?.sessionStartTime)}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-gray-800">End Time:</span> {formatTime(session?.sessionEndTime)}
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

          <div className="mt-6 flex justify-end gap-3">
            {session?.sessionStatus === "COMPLETED" && (
              <button
                onClick={() => setShowRateModal(true)}
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
              >
                Rate Tutor
              </button>
            )}

            <button
              onClick={onClose}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      {showRateModal && (
        <RateModal
          session={session}
          imageUrl={imageUrl}
          onClose={() => setShowRateModal(false)}
        />
      )}
    </>
  );
};

export default SessionModal;
