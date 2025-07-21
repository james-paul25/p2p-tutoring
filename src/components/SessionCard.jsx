import React from "react";
import Avatar from "../assets/prof.jpg";
import { formatDateTime } from "../utils/formatDateTime";
import { statusColors } from "../utils/colors";

const SessionCard = ({ session, profilePictures, onClick }) => {
  const matchedPic = profilePictures.find(
    (pic) => pic?.user?.userId === session?.tutor?.user?.userId
  );

  const imageUrl = matchedPic
    ? `http://localhost:8080${matchedPic.filePath}`
    : Avatar;

  const status = session?.sessionStatus?.toUpperCase();
  const statusBg = statusColors[status] || statusColors.DEFAULT;

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer p-4 rounded-lg flex gap-4 items-center transition ${statusBg}`}
    >
      <img
        src={imageUrl}
        alt={session?.tutor?.student?.fullName || "Tutor Avatar"}
        className="w-12 h-12 rounded-full"
      />
      <div>
        <h3 className="font-semibold text-purple-900">
          {session?.tutor?.student?.fullName}
        </h3>
        <h4 className="font-semibold text-sm text-gray-800">
          <strong>Status: </strong>
          <span className={
            status === "PENDING"
              ? "text-yellow-600"
              : status === "REJECTED"
                ? "text-red-600"
                : status === "APPROVED"
                  ? "text-green-600"
                  : status === "COMPLETED"
                    ? "text-blue-600"
                    : "text-gray-600"
          }>
            {status}
          </span>
        </h4>
        <p className="text-sm text-purple-800">
          {session?.subject?.subjectDescription} – {session?.topic}
          {formatDateTime(session?.sessionDate, session?.sessionTime)}
        </p>
      </div>
    </div>
  );
};

export default SessionCard;
