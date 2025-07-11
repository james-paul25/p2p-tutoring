import React from "react";
import Avatar from "../assets/prof.jpg";
import { formatDateTime } from "../utils/formatDateTime";

const SessionCard = ({ session, profilePictures, onClick }) => {
  const matchedPic = profilePictures.find(
    (pic) => pic?.user?.userId === session?.tutor?.user?.userId
  );

  const imageUrl = matchedPic
    ? `http://localhost:8080${matchedPic.filePath}`
    : Avatar;

  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-purple-100 p-4 rounded-lg flex gap-4 items-center hover:bg-purple-200"
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
        <p className="text-sm text-purple-800">
          {session?.subject?.subjectDescription} – {session?.topic} – {formatDateTime(session?.sessionDate, session?.sessionTime)}
        </p>
      </div>
    </div>
  );
};

export default SessionCard;
