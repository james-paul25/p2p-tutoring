import React from "react";
import { Paperclip, Send } from "lucide-react";

const MessageInput = ({
  newMessage,
  setNewMessage,
  selectedFile,
  setSelectedFile,
  handleSendMessage,
  handleSendFile,
  handleKeyDown,
}) => {
  return (
    <div className="flex items-center p-3 border-t gap-2">
      <input
        type="file"
        accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,image/*,video/*"
        id="fileInput"
        onChange={(e) => setSelectedFile(e.target.files[0])}
        className="hidden"
      />
      <label
        htmlFor="fileInput"
        className="cursor-pointer text-purple-600 hover:text-purple-800"
      >
        <Paperclip size={20} />
      </label>

      <input
        type="text"
        placeholder="Type a message..."
        className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <button
        onClick={selectedFile ? handleSendFile : handleSendMessage}
        className="text-purple-600 hover:text-purple-800"
      >
        <Send size={20} />
      </button>
    </div>
  );
};

export default MessageInput;
