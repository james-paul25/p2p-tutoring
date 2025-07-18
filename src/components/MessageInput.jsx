import React from "react";
import { Paperclip, Send, X } from "lucide-react";

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
        <div className="flex flex-col border-t">
            {selectedFile && (
                <div className="flex items-center justify-between bg-gray-100 px-4 py-2 text-sm text-gray-700">
                    <span className="truncate max-w-[80%]">
                        📎 {selectedFile.name}
                    </span>
                    <button
                        onClick={() => setSelectedFile(null)}
                        className="text-gray-500 hover:text-red-500"
                        title="Remove file"
                    >
                        <X size={16} />
                    </button>
                </div>
            )}

            <div className="flex items-center gap-2 p-3">
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
                    title="Attach file"
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
                    title="Send"
                >
                    <Send size={20} />
                </button>
            </div>
        </div>
    );
};

export default MessageInput;
