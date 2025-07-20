import React, { useState } from "react";
import InputField from "../components/InputField";
import { useOutsideClick } from "../utils/useOutsideClick";
import SuccessModal from "./SuccessModal";
import FailedModal from "./FailedModal";
import { useEscapeClose } from "../utils/useEscapeClose";

const EditProfileModal = ({ student, departments, onClose }) => {

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailedModal, setShowFailedModal] = useState(false);
  const [message, setMessage] = useState(null);

  useOutsideClick("editProfileBackdrop", onClose);
  useEscapeClose(onClose);

  const [formData, setFormData] = useState({
    firstName: student?.firstName || "",
    middleName: student?.middleName || "",
    lastName: student?.lastName || "",
    yearLevel: student?.yearLevel || "",
    departmentId: student?.department?.departmentId || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `http://localhost:8080/api/v1/students/update-student/${student?.studentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) {
        const mes = await res.text();
        setMessage(mes);
        setShowFailedModal(true);
      }

      const updated = await res.text();
      setMessage(updated || "Your info was updated successfully!");
      setShowSuccessModal(true);
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  return (
    <>
      <div
        id="editProfileBackdrop"
        className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-sm"
      >
        <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md relative">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Edit Profile</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
            <InputField
              label="Middle Name"
              name="middleName"
              value={formData.middleName}
              onChange={handleChange}
            />
            <InputField
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />

            <div>
              <label
                htmlFor="department"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Department
              </label>
              <select
                id="department"
                name="departmentId"
                value={formData.departmentId}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select department</option>
                {departments.map((dept) => (
                  <option key={dept.departmentId} value={dept.departmentId}>
                    {dept.departmentName}
                  </option>
                ))}
              </select>
            </div>

            <InputField
              label="Year Level"
              name="yearLevel"
              value={formData.yearLevel}
              onChange={handleChange}
            />

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
      {showSuccessModal && (
        <SuccessModal
          message={message}
          onClose={() => {
            setShowSuccessModal(false);
            onClose()
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

export default EditProfileModal;
