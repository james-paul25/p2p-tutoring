// src/components/cards/TutorCard.jsx
import React from "react";
import Avatar from "../assets/prof.jpg";

const variantStyles = {
  default: "bg-white hover:bg-gray-50",
  favorite: "bg-pink-100 hover:bg-pink-200",
  topRated: "bg-yellow-100 hover:bg-yellow-200",
};

const textStyles = {
  default: "text-gray-800",
  favorite: "text-pink-900",
  topRated: "text-yellow-900",
};

const TutorCard = ({ tutor, imageUrl, onClick, variant = "default" }) => {
  return (
    <div
      onClick={onClick}
      className={`${variantStyles[variant]} shadow rounded-lg p-4 flex gap-4 cursor-pointer`}
    >
      <img
        src={imageUrl || Avatar}
        alt={tutor?.student?.firstName || tutor?.name}
        className="w-14 h-14 rounded-full object-cover"
      />
      <div>
        <h3 className={`font-semibold ${textStyles[variant]}`}>
          {tutor?.student?.firstName || tutor?.name}
        </h3>
        <p className="text-sm text-gray-600">
          <strong>Subject: </strong>
          {tutor?.subject?.subjectDescription || tutor?.subject}
        </p>
        {tutor?.status && (
          <p className="text-sm text-gray-600">
            <strong>Status: </strong>
            {tutor.status}
          </p>
        )}
        {tutor?.student?.yearLevel && (
          <p className="text-sm text-yellow-600">
            Year Level: {tutor.student.yearLevel}
          </p>
        )}
        {tutor?.rating && (
          <p className="text-sm text-yellow-600">⭐ {tutor.rating}</p>
        )}
      </div>
    </div>
  );
};

export default TutorCard;
