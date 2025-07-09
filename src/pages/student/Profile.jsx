import React, { useState, useEffect } from "react";
import EditProfileModal from "../../modals/EditProfileModal";
import defaultAvatar from "../../assets/prof.jpg";
import { getStudentInfo } from "../../services/studentService";

const Profile = ({ user }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [userInfo, setUserInfo] = useState(user);
  const [profileImage, setProfileImage] = useState(defaultAvatar);
  const [studentInfo, setStudentInfo] = useState([]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      // here, upload the change in backend 
    }
  };

  useEffect(() => {
      if (!user?.userId) return;
  
      const fetchData = async () => {
        try {
          const [student] = await Promise.all([
            getStudentInfo(user.userId),
          ]);
    
          setStudentInfo(student);
        } catch (error) {
          console.error("Fetching error:", error);
        }
      };
    
      fetchData();
    }, [user.userId]);

    console.log("student: ",studentInfo)
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

        {/* Profile Image + Upload */}
        <div className="flex items-center gap-6 mb-6">
          <div className="relative group">
            <img
              src={profileImage}
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

          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              {userInfo?.username || "N/A"}
            </h3>
            <p className="text-gray-600">{userInfo?.email || "No email"}</p>
            <p className="text-gray-500">{studentInfo?.bio || "No bio"}</p>
          </div>
        </div>

        {/* User Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ProfileItem label="Full Name" value={studentInfo?.fullName} />
          <ProfileItem label="Department" value={studentInfo?.department} />
          <ProfileItem label="Year Level" value={studentInfo?.yearLevel} />
          <ProfileItem label="Role" value={studentInfo?.user?.role} />
        </div>
      </div>

      {showEditModal && (
        <EditProfileModal
          user={userInfo}
          onClose={() => setShowEditModal(false)}
          onSave={(updatedUser) => {
            setUserInfo(updatedUser);
            setShowEditModal(false);
          }}
        />
      )}
    </>
  );
};

const ProfileItem = ({ label, value }) => (
  <div className="bg-gray-50 p-4 rounded-md shadow-inner">
    <h4 className="text-sm text-gray-500">{label}</h4>
    <p className="text-base text-gray-800">{value || "N/A"}</p>
  </div>
);

export default Profile;
