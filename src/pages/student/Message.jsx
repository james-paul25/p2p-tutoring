import React from "react";

const Message = ({user}) => {


  return (
      <div className="bg-white p-6 rounded-lg shadow-md space-y-10 transition">
        <h2 className="text-2xl font-bold mb-4">Message Content</h2>
        <p>Message, {user.username}!</p>
      </div>
  );
};

export default Message;
