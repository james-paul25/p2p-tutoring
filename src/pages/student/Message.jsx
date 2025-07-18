import React from "react";

const Message = ({ user, messages }) => {
  return (
    <div className="min-h-[80vh] bg-gray-100 p-4 rounded-lg shadow-inner">
      <h2 className="text-2xl font-bold mb-6 text-center">Session Messages</h2>

      <div className="bg-white p-4 rounded-lg shadow space-y-4 max-w-2xl mx-auto overflow-y-auto max-h-[70vh]">
        {messages?.length === 0 ? (
          <p className="text-gray-500 text-center">No messages in this session yet.</p>
        ) : (
          messages.map((msg, index) => {
            const isOwn = msg.senderId === user.userId;

            return (
              <div
                key={index}
                className={`flex ${
                  isOwn ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-lg max-w-[70%] ${
                    isOwn
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-gray-200 text-gray-800 rounded-bl-none"
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                  <p className="text-xs mt-1 opacity-70 text-right">
                    {new Date(msg.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Message;
