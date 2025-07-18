import React from "react";

const ProfileItem = ({ label, value }) => (
  <div className="bg-gray-50 p-4 rounded-md shadow-inner">
    <h4 className="text-sm text-gray-500">{label}</h4>
    <p className="text-base text-gray-800">{value || "N/A"}</p>
  </div>
)

export default ProfileItem;