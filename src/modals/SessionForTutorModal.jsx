import React from "react";
import { useOutsideClick } from "../utils/useOutsideClick";
import Avatar from "../assets/prof.jpg";
import { statusTextColors } from "../utils/colors";
import { Check, X, Pencil } from "lucide-react";
import SuccessModal from "./SuccessModal";
import FailedModal from "./FailedModal";
import { useEscapeClose } from "../utils/useEscapeClose";
import TutorSessionCardUi from "../components/TutorSessionCardUi";
import FilterDropdown from "../components/FilterDropdown";
import TutorLayout from "../layout/TutorLayout";
import TutorSession from "../pages/tutor/TutorSession";

const SessionForTutorModal = ({ tutorSession, profilePictures, onClose }) => {
  useOutsideClick("tutorSessionModalBackdrop", onClose);
  useEscapeClose(onClose);

  const matchedPic = profilePictures.find(
    (pic) => pic?.user?.userId === tutorSession?.student?.user?.userId
  );

  const imageUrl = matchedPic
    ? `http://localhost:8080${matchedPic.filePath}`
    : Avatar;

  if (!tutorSession) return null;

  const status = tutorSession?.sessionStatus?.toUpperCase();
  const statusTextColor = statusTextColors[status] || statusTextColors.DEFAULT;



  return (
    <>
      <div
        id="tutorSessionModalBackdrop"
        className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-sm"
      >
        <TutorSessionCardUi
          sessionId={tutorSession?.sessionId}
          imageUrl={imageUrl}
          firstName={tutorSession?.student?.firstName}
          fullName={tutorSession?.student?.fullName}
          sessionStatus={tutorSession?.sessionStatus}
          subjectDescription={tutorSession?.subject?.subjectDescription}
          topic={tutorSession?.topic}
          sessionDate={tutorSession?.sessionDate}
          sessionStartTime={tutorSession?.sessionStartTime}
          sessionEndTime={tutorSession?.sessionEndTime}
          statusTextColor={statusTextColor}
          notes={tutorSession?.notes}
          onClose={onClose}
        />
      </div>
    </>
  );
};

export default SessionForTutorModal;
