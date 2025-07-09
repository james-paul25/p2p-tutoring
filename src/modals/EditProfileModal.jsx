import React, { useState, useEffect } from "react";
import InputField from "../components/InputField";
import { fetchDepartment } from "../services/departmentService";

const EditProfileModal = ({ student, onClose, onSave }) => {
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    firstName: student?.firstName || "",
    middleName: student?.middleName || "",
    lastName: student?.lastName || "",
    yearLevel: student?.yearLevel || "",
    department: student?.department?.departmentName || "",
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

  useEffect(() => {
    if (!student?.user?.userId) return;

    const fetchData = async () => {
      try {
        const result = await fetchDepartment();
        setDepartments(result);
      } catch (error) {
        console.error("Fetching departments error:", error);
      }
    };

    fetchData();
  }, [student?.user?.userId]);

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

      if (!res.ok) throw new Error("Failed to update profile");

      const updated = await res.text();

      alert(updated || "Your info was updated successfully!");
      // ✅ Flatten department object for safe re-rendering
      onSave?.({
        ...updated,
        department: updated?.department?.departmentName || "",
      });
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

          {/* Department Dropdown */}
          <div>
            <label
              htmlFor="department"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Department
            </label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select department</option>
              {departments.map((dept) => (
                <option key={dept.departmentId} value={dept.departmentName}>
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
  );
};

export default EditProfileModal;
