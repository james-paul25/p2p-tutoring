import React, { useState, useEffect } from "react";
import InputField from "../components/InputField";

const EditProfileModal = ({ user, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    userId: user.userId,
    fullName: user.fullName || "",
    department: user.department || "",
    yearLevel: user.yearLevel || "",
    email: user.email || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
      const handleOutsideClick = (e) => {
        if (e.target.id === "editProfileBackdrop") {
          onClose();
        }
      };
  
      window.addEventListener("mousedown", handleOutsideClick);
      return () => window.removeEventListener("mousedown", handleOutsideClick);
  }, [onClose]);
    
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:8080/api/v1/users/update-student/${user.userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to update profile");

      const updated = await res.json();
      onSave?.(updated); // optionally update parent state
      onClose();
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  return (
      <div
          id="editProfileBackdrop"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
      >
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md relative">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Edit Profile</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} />
          <InputField label="Middle Name" name="middleName" value={formData.firstName} onChange={handleChange} />
          <InputField label="Last Name" name="lastName" value={formData.firstName} onChange={handleChange} />
          <InputField label="Department" name="department" value={formData.department} onChange={handleChange} />
          <InputField label="Year Level" name="yearLevel" value={formData.yearLevel} onChange={handleChange} />
          <InputField label="Email" name="email" value={formData.email} onChange={handleChange} />

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
  );
};


export default EditProfileModal;
