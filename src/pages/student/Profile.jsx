import React from "react";

const Profile = ({user}) => {

  return (
      <div>
        <h2 className="text-2xl font-bold mb-4">Home Page Content</h2>
          <p>This is your profile, {user.username}!</p>
          <p>{ user.email }</p>
      </div>
  );
};

export default Profile;
