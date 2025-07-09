import React, { useState } from "react";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md relative">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Edit Profile</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} />
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

const InputField = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      {...props}
      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
    />
  </div>
);

export default EditProfileModal;
