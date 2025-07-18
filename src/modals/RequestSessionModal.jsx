import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useOutsideClick } from "../utils/useOutsideClick";
import { getStudentInfo } from "../services/studentService";
import SuccessModal from "./SuccessModal";
import FailedModal from "./FailedModal";

const RequestSessionModal = ({ user, tutor, onClose }) => {
  useOutsideClick("requestSessionBackdrop", onClose);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [topic, setTopic] = useState("");
  const [error, setError] = useState("");
  const [studentInfo, setStudentInfo] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showFailedModal, setShowFailedModal] = useState(false);
  const [failedMessage, setFailedMessage] = useState("");

  const subjectId = tutor?.subject?.subjectId;

  useEffect(() => {
    if (!user?.userId) return;
    const fetchData = async () => {
      try {
        const student = await getStudentInfo(user.userId);
        setStudentInfo(student);
      } catch (error) {
        console.error("Fetching error:", error);
      }
    };
    fetchData();
  }, [user.userId]);

  const isFutureDateTime = () => {
    if (!date || !time) return false;
    const selectedDateTime = new Date(`${date}T${time}`);
    return selectedDateTime.getTime() > Date.now();
  };

  const postApplySession = async () => {
    try {
      const formattedTime = time.length === 5 ? `${time}:00` : time;

      const res = await fetch(
        `http://localhost:8080/api/v1/sessions/students-apply-session/${tutor?.tutorId}/${subjectId}/${studentInfo?.studentId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            sessionDate: date,              // format: YYYY-MM-DD
            sessionTime: formattedTime,     // format: HH:mm:ss
            topic: topic,
            tutorUser: tutor?.user?.userId,
            studentUser: user?.userId,

          }),
        }
      );

      const responseText = await res.text();

      if (!res.ok) {
        throw new Error(responseText);
      }

      setSuccessMessage(responseText || "You applied successfully");
      setShowSuccessModal(true);
    } catch (e) {
      setFailedMessage(e.message || "Failed to apply session!");
      setShowFailedModal(true);
      console.error(e);
    }
  };

  const handleSubmit = () => {
    if (!date || !time || !topic) {
      setError("All fields are required.");
      return;
    }

    if (!isFutureDateTime()) {
      setError("Please select a future date and time.");
      return;
    }

    setError("");
    postApplySession();
  };

  return (
    <>
      <div
        id="requestSessionBackdrop"
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
      >
        <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>

          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Request Session with {tutor?.student?.fullName}
          </h2>
          <h3 className="text-base font-semibold text-gray-700 mb-4">
            Subject: {tutor?.subject?.subjectDescription}
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                className="w-full px-3 py-2 border rounded-md"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Time</label>
              <input
                type="time"
                className="w-full px-3 py-2 border rounded-md"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Topic</label>
              <textarea
                className="w-full px-3 py-2 border rounded-md"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Loop, Linked list, Development phase..."
              />
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <div className="flex justify-end gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Submit Request
              </button>
            </div>
          </div>
        </div>
      </div>

      {showSuccessModal && (
        <SuccessModal
          message={successMessage}
          onClose={() => {
            setShowSuccessModal(false);
            onClose();
            window.location.reload();
          }}
        />
      )}

      {showFailedModal && (
        <FailedModal
          message={failedMessage}
          onClose={() => setShowFailedModal(false)}
        />
      )}
    </>
  );
};

export default RequestSessionModal;
