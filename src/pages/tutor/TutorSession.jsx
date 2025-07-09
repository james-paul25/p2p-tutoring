import React from "react";

const TutorSession = ({user}) => {

  return (
      <div className="bg-white p-6 rounded-lg shadow-md space-y-10 transition">
        <h2 className="text-2xl font-bold mb-4">Session</h2>
          <p>This is your session, {user.username}!</p>
          <p>{ user.email }</p>
      </div>
  );
};

export default TutorSession;
