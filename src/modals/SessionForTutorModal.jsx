import React, { useState } from "react";
import { useOutsideClick } from "../utils/useOutsideClick";
import Avatar from "../assets/prof.jpg";
import { formatDate, formatTime } from "../utils/formatDateTime";
import { statusTextColors } from "../utils/colors";
import { Check, X, Pencil } from "lucide-react"; 

const SessionForTutorModal = ({ tutorSession, profilePictures, onClose }) => {
  useOutsideClick("tutorSessionModalBackdrop", onClose);
  
  const [editingNote, setEditingNote] = useState(false);
  const [noteInput, setNoteInput] = useState(tutorSession.notes || "");

    // Example handler (you can replace this with API/DB update logic)
  const handleNoteSave = () => {
    // Normally, you'd send an API call here to update the session notes.
    // For now, just close the editor and pretend it saved.
    tutorSession.notes = noteInput;
    setEditingNote(false);
    };
    
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
    <div
      id="tutorSessionModalBackdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-sm"
    >
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md relative">
        <div className="flex items-center gap-4 mb-4">
          <img
            src={imageUrl}
            alt={tutorSession?.student?.firstName}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h2 className="text-xl font-bold text-gray-800">{tutorSession?.student?.fullName}</h2>
            <h6 className={`text-l font-bold ${statusTextColor}`}>{tutorSession?.sessionStatus}</h6>
            <p className="text-gray-600">{tutorSession?.subject?.subjectDescription} – { tutorSession?.topic }</p>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-800">Date:</span> {formatDate(tutorSession?.sessionDate)}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-800">Time:</span> {formatTime(tutorSession?.sessionTime)}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-800">Location:</span> dummy location
          </p>
          <div className="text-sm text-gray-600 mt-2">
            {editingNote ? (
                <div className="flex flex-col gap-1 w-full">
                <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-800">Notes:</span>
                </div>
                <textarea
                    className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm"
                    value={noteInput}
                    onChange={(e) => setNoteInput(e.target.value)}
                />
                <div className="flex justify-end mt-1 gap-2">
                    <button onClick={handleNoteSave} className="text-green-600 hover:text-green-800">
                    <Check className="h-4 w-4" />
                    </button>
                    <button onClick={() => setEditingNote(false)} className="text-gray-500 hover:text-gray-800">
                    <X className="h-4 w-4" />
                    </button>
                </div>
                </div>
            ) : (
                <div className="flex items-center justify-between gap-2">
                <span className="font-semibold text-gray-800">Notes:</span>
                <p className="text-sm text-gray-600 truncate flex-1">{tutorSession.notes || "N/A"}</p>
                <button onClick={() => setEditingNote(true)} className="text-gray-400 hover:text-gray-700">
                    <Pencil className="w-4 h-4" />
                </button>
                </div>
            )}
        </div>

        </div>

        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionForTutorModal;
