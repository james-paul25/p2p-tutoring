import React from "react";

const Session = ({user}) => {

  return (
      <div>
        <h2 className="text-2xl font-bold mb-4">Session</h2>
          <p>This is your session, {user.username}!</p>
          <p>{ user.email }</p>
      </div>
  );
};

export default Session;
