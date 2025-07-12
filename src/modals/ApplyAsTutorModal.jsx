import React, { useState } from "react";
import { X } from "lucide-react";
import InputField from "../components/InputField";
import { useOutsideClick } from "../utils/useOutsideClick";

const ApplyAsTutorModal = ({ user, student, subject, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [subjectIden, setSubjectId] = useState();
  const [gwa, setGwa] = useState(); 
  
  useOutsideClick("editApplyBackdrop", onClose);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!subjectIden || !gwa) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`http://localhost:8080/api/v1/tutors/apply/${user.userId}/${student.studentId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
          body: JSON.stringify({
              subjectId: subjectIden,
              gwa : gwa
          }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Something went wrong.");
      }

      const data = await response.text();
      alert(data || "Application submitted successfully!");
      onClose();
    } catch (error) {
      alert("Failed to submit application: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
      <div
          id="editApplyBackdrop"
          className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold text-gray-800 mb-4">Apply as a Tutor</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
        <div>
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Subject
            </label>
            <select
              id="subject"
              name="subjectIden"
              value={subjectIden}
              onChange={(e) => setSubjectId(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select subject</option>
              {subject.map((sub) => (
                <option key={sub.subjectId} value={sub.subjectId}>
                  {sub.subjectDescription}
                </option>
              ))}
            </select>
          </div>

          <InputField
            label="Grade"
            placeholder="Put here your grade at chosen subject"
            name="gwa"
            value={gwa}
            onChange={(e) => setGwa(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplyAsTutorModal;
