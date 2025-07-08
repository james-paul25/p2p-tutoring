import React from "react";

const Message = ({user}) => {


  return (
      <div>
        <h2 className="text-2xl font-bold mb-4">Message Content</h2>
        <p>Message, {user.username}!</p>
      </div>
  );
};

export default Message;
