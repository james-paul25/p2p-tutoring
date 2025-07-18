import React, { useState } from "react";
import { useOutsideClick } from "../utils/useOutsideClick";
import { X, Send, Paperclip } from "lucide-react";

const ChatModal = ({ user, onClose }) => {
  useOutsideClick("chatBackdrop", onClose);

  const currentUserId = "you";
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [selectedMessageId, setSelectedMessageId] = useState(null); // Track selected message

  const handleSend = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        senderId: currentUserId,
        type: "text",
        text,
        timestamp: new Date(),
      },
    ]);
    setText("");
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:8080/api/messages/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");
      const { url } = await res.json();

      const fileType = file.type.split("/")[0];

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          senderId: currentUserId,
          type: fileType,
          fileName: file.name,
          fileUrl: url,
          timestamp: new Date(),
        },
      ]);
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to upload file.");
    }
  };

  const toggleTimestamp = (msgId) => {
    setSelectedMessageId((prevId) => (prevId === msgId ? null : msgId));
  };

  return (
    <div
      id="chatBackdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
    >
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md h-[80vh] flex flex-col relative">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <img
              src={user?.photoURL || "/default-avatar.png"}
              alt={user.username}
              className="w-10 h-10 rounded-full object-cover"
            />
            <h2 className="text-lg font-semibold text-gray-800">
              {user.username}
            </h2>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50">
            {messages.length === 0 ? (
            <div className="text-center text-gray-400 text-sm mt-10">
                Start messaging now...
            </div>
            ) : (
            messages.map((msg) => {
                const isMe = msg.senderId === currentUserId;
                const isSelected = selectedMessageId === msg.id;
                const time = new Date(msg.timestamp).toLocaleString();

                return (
                <div
                    key={msg.id}
                    className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
                >
                    <div
                    className={`px-4 py-2 rounded-lg text-sm max-w-[75%] cursor-pointer ${
                        isMe
                        ? "bg-purple-600 text-white rounded-br-none"
                        : "bg-gray-200 text-gray-800 rounded-bl-none"
                    }`}
                    onClick={() => toggleTimestamp(msg.id)}
                    >
                    {msg.type === "text" ? (
                        msg.text
                    ) : msg.type === "image" ? (
                        <img src={msg.fileUrl} alt={msg.fileName} className="rounded max-w-full" />
                    ) : msg.type === "video" ? (
                        <video controls src={msg.fileUrl} className="rounded max-w-full" />
                    ) : (
                        <a
                        href={msg.fileUrl}
                        download={msg.fileName}
                        className="text-blue-700 underline break-all"
                        target="_blank"
                        rel="noreferrer"
                        >
                        📎 {msg.fileName}
                        </a>
                    )}
                    </div>
                    {isSelected && (
                    <span className="text-xs text-gray-400 mt-1">{time}</span>
                    )}
                </div>
                );
            })
            )}
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="flex items-center p-3 border-t gap-2">
          <input
            type="file"
            accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,image/*,video/*"
            id="fileInput"
            onChange={handleFileUpload}
            className="hidden"
          />
          <label htmlFor="fileInput" className="cursor-pointer text-purple-600 hover:text-purple-800">
            <Paperclip size={20} />
          </label>

          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit" className="text-purple-600 hover:text-purple-800">
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatModal;
