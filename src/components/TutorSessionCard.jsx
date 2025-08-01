import React from "react";
import Avatar from "../assets/prof.jpg";
import { formatDateTime } from "../utils/formatDateTime";
import { statusColors } from "../utils/colors";

const TutorSessionCard = ({ session, profilePictures, onClick }) => {
  const matchedPic = profilePictures.find(
    (pic) => pic?.user?.userId === session?.student?.user?.userId
  );

  const imageUrl = matchedPic
    ? `http://localhost:8080${matchedPic.filePath}`
    : Avatar;

  const status = session?.sessionStatus?.toUpperCase();
  const statusBg = statusColors[status] || statusColors.DEFAULT;

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer p-4 rounded-lg flex gap-4 items-center transition ${statusBg}
      hover:shadow-md hover:scale-[1.01] transition duration-200`}
    >
      <img
        src={imageUrl}
        alt={session?.student?.firstName || "Student Avatar"}
        className="w-12 h-12 rounded-full"
      />
      <div>
        <h3 className="font-semibold text-purple-900">
          {session?.student?.fullName}
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
          <strong>Subject: </strong>
          {session?.subject?.subjectDescription} – {session?.topic}
        </p >
        <p className="text-sm text-blue-800">{formatDateTime(session?.sessionDate, session?.sessionTime)}</p>
      </div>
    </div>
  );
};

export default TutorSessionCard;
