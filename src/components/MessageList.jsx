import React from "react";

const MessageList = ({
  messages,
  currentUserRole,
  selectedMessageId,
  toggleTimestamp,
  messagesEndRef,
}) => {
    console.log("message sa message list", messages);
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50">
      {messages.length === 0 ? (
        <div className="text-center text-gray-400 text-sm mt-10">
          Start messaging now...
        </div>
      ) : (
        messages.map((msg, index) => {
          const isMe = msg.senderRole === currentUserRole;
          const time = new Date(msg.sendAt || msg.timestamp).toLocaleString();

          return (
            <div
              key={index}
              className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
            >
              <div
                onClick={() => toggleTimestamp(index)}
                className={`px-4 py-2 rounded-lg text-sm max-w-[60%] cursor-pointer ${
                  isMe
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-gray-200 text-gray-800 rounded-bl-none"
                }`}
              >
                {msg.message ? (
                  msg.message
                ) : msg.filePath ? (
                  <a
                    href={msg.filePath}
                    download={msg.fileName}
                    className="text-blue-700 underline break-all"
                    target="_blank"
                    rel="noreferrer"
                  >
                    📎 {msg.fileName}
                  </a>
                ) : (
                  "Unknown message format"
                )}
              </div>
              {selectedMessageId === index && (
                <span className="text-xs text-gray-400 mt-1">{time}</span>
              )}
            </div>
          );
        })
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
