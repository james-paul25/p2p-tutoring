import React, { useState, useEffect } from "react";
import EditProfileModal from "../modals/EditProfileModal";
import defaultAvatar from "../assets/prof.jpg";
import { Pencil, Check, X } from "lucide-react";
import ProfileItem from "../components/ProfileItem"

{/* usable both sa tutor and student */ }
const Profile = ({ user, student, profile, departments }) => {
  const API_BASE_URL = import.meta.env.VITE_API_URL;
  const [showEditModal, setShowEditModal] = useState(false);
  const [profileImage, setProfileImage] = useState();
  const [editingBio, setEditingBio] = useState(false);
  const [bioInput, setBioInput] = useState("");
  const [studentInfo, setStudentInfo] = useState([]);

  useEffect(() => {
    if (!user?.userId) return;

    const fetchData = async () => {
      try {
        setBioInput(student.bio || "");
        setStudentInfo(student);
        if (profile?.filePath) {
          setProfileImage(`${API_BASE_URL}${profile.filePath}`);
        }
      } catch (error) {
        console.error("Fetching error:", error);
      }
    };

    fetchData();
  }, [user.userId, student, profile, API_BASE_URL]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);

      try {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch(`${API_BASE_URL}/api/v1/profile-picture/upload/${user.userId}`, {
          method: "POST",
          credentials: "include",
          body: formData,
        });

        if (!res.ok) {
          const errText = await res.text();
          throw new Error(errText);
        }

        const savedProfile = await res.json();
        alert(savedProfile.message || "Profile image uploaded successfully!");
      } catch (err) {
        console.warn("Upload failed:", err.message);
        alert("Failed to upload image: " + err.message);
      }
    }
  };

  const handleBioUpdate = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/students/edit-bio/${studentInfo.studentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ bio: bioInput }),
      });

      if (!res.ok) throw new Error("Failed to update bio");

      const updated = await res.text();

      alert(updated);
      setStudentInfo((prev) => ({ ...prev, bio: bioInput }));
      setEditingBio(false);
    } catch (err) {
      console.error("Bio update error:", err);
      alert("Failed to update bio");
    }
  };

  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto mt-10 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">My Profile</h2>
          <button
            onClick={() => setShowEditModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Edit Profile
          </button>
        </div>

        <div className="flex items-center gap-6 mb-6">
          <div className="relative group">
            <img
              src={profileImage || defaultAvatar}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border border-gray-300"
            />
            <label className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xs text-white rounded-full opacity-0 group-hover:opacity-100 transition cursor-pointer">
              Change
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900">
              {user.username || "N/A"}
            </h3>
            <p className="text-gray-600">{user.email || "No email"}</p>

            <div className="flex items-start gap-2 mt-1">
              {editingBio ? (
                <div className="flex flex-col w-full">
                  <textarea
                    className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm"
                    value={bioInput}
                    onChange={(e) => setBioInput(e.target.value)}
                  />
                  <div className="flex justify-end mt-1 gap-2">
                    <button onClick={handleBioUpdate} className="text-green-600 hover:text-green-800">
                      <Check className="h-4 w-4" />
                    </button>
                    <button onClick={() => setEditingBio(false)} className="text-gray-500 hover:text-gray-800">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-gray-500 text-sm">{studentInfo?.bio || "No bio"}</p>
                  <button onClick={() => setEditingBio(true)} className="text-gray-400 hover:text-gray-700">
                    <Pencil className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ProfileItem label="Full Name" value={studentInfo?.fullName} />
          <ProfileItem label="Department" value={studentInfo?.department?.departmentName} />
          <ProfileItem label="Year Level" value={studentInfo?.yearLevel} />
          <ProfileItem label="Role" value={studentInfo?.user?.role} />
        </div>
      </div>

      {showEditModal && (
        <EditProfileModal
          student={studentInfo}
          departments={departments}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </>
  );
};

export default Profile;
