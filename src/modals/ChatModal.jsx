import React, { useState, useEffect, useRef } from "react";
import { X, Send, Paperclip } from "lucide-react";
import { useOutsideClick } from "../utils/useOutsideClick";
import MessageList from "../components/MessageList";
import MessageInput from "../components/MessageInput";
import FailedModal from "./FailedModal";
import Avatar from "../assets/prof.jpg";
import { fetchMessages } from "../services/messageService";
import { useEscapeClose } from "../utils/useEscapeClose";

const ChatModal = ({
    session,
    currentUserRole,
    profilePictures,
    onClose,
}) => {
    useOutsideClick("chatBackdrop", onClose);
    useEscapeClose(onClose);

    const messagesEndRef = useRef(null);

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedMessageId, setSelectedMessageId] = useState(null);
    const [showFailedModal, setShowFailedModal] = useState(false);
    const [messageStatus, setMessageStatus] = useState(null);
    const [name, setName] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    const matchedPicForStudent = profilePictures.find(
        (pic) => pic?.user?.userId === session?.tutorUser?.userId
    );

    const matchedPicForTutor = profilePictures.find(
        (pic) => pic?.user?.userId === session?.studentUser?.userId
    );

    const imageUrlForStudent = matchedPicForStudent
        ? `http://localhost:8080${matchedPicForStudent.filePath}`
        : Avatar;
    
    const imageUrlForTutor = matchedPicForTutor
        ? `http://localhost:8080${matchedPicForTutor.filePath}`
        : Avatar;
    
    useEffect(() => {

        if (currentUserRole === "STUDENT") {
            setName(session?.tutor?.student?.fullName);
            setImageUrl(imageUrlForStudent);
        } else if (currentUserRole === "TUTOR") {
            setName(session?.student?.fullName);
            setImageUrl(imageUrlForTutor);
        }
    }, [currentUserRole, session?.tutor?.student?.fullName, session?.student?.fullName, imageUrlForStudent, imageUrlForTutor]);

    


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchMessages(session.sessionId);

                setMessages(response);
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };

        fetchData();
    }, [session?.sessionId]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const handleSendMessage = async () => {
        if (newMessage.trim() === "") {
            setMessageStatus("Message cannot be empty");
            setShowFailedModal(true);
            return;
        }

        const messageData = {
            message: newMessage,
            senderRole: currentUserRole,
            sendAt: new Date().toISOString(),
        };

        try {
            const response = await fetch(`http://localhost:8080/api/v1/messages/send/${session?.sessionId}/${session?.tutor?.tutorId}/${session?.student?.studentId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: 'include',
                body: JSON.stringify(messageData),
            });

            if (!response.ok) throw new Error("Failed to send message");

            setMessages((prev) => [...prev, messageData]);
            setNewMessage("");
        } catch (error) {
            console.error("Error sending message:", error);
            setMessageStatus("Error sending message");
            setShowFailedModal(true);
        }
    };

    const handleSendFile = async () => {
        if (!selectedFile) {
            setMessageStatus("Please select a file to send");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("senderRole", currentUserRole);
        formData.append("sendAt", new Date().toISOString());

        try {
            const response = await fetch(
                `http://localhost:8080/api/v1/messages/send-file/${session?.sessionId}/${session?.tutor?.tutorId}/${session?.student?.studentId}`, {
                method: "POST",
                credentials: 'include',
                body: formData
            }
            );

            if (!response.ok) throw new Error("Failed to send file");

            const result = await response.json();

            setMessages((prev) => [
                ...prev,
                {
                    fileName: selectedFile.name,
                    senderRole: currentUserRole,
                    sendAt: new Date().toISOString(),
                    filePath: result.filePath,
                },
            ]);
            setSelectedFile(null);
        } catch (error) {
            console.error("Error sending file:", error);
            setMessageStatus("Error sending file");
            setShowFailedModal(true);
        }
    };

    const toggleTimestamp = (id) => {
        setSelectedMessageId((prevId) => (prevId === id ? null : id));
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <>
            <div
                id="chatBackdrop"
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
            >
                <div className="bg-white rounded-lg shadow-lg w-full max-w-md h-[80vh] flex flex-col relative">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b">
                        <div className="flex items-center gap-3">
                            <img
                                src={imageUrl}
                                alt={name}
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
                        </div>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Messages */}
                    <MessageList
                        messages={messages}
                        currentUserRole={currentUserRole}
                        selectedMessageId={selectedMessageId}
                        toggleTimestamp={toggleTimestamp}
                        messagesEndRef={messagesEndRef}
                    />

                    {/* Message input */}
                    <MessageInput
                        newMessage={newMessage}
                        setNewMessage={setNewMessage}
                        selectedFile={selectedFile}
                        setSelectedFile={setSelectedFile}
                        handleSendMessage={handleSendMessage}
                        handleSendFile={handleSendFile}
                        handleKeyDown={handleKeyDown}
                    />

                </div>
            </div>

            {showFailedModal && (
                <FailedModal
                    message={messageStatus}
                    onClose={() => setShowFailedModal(false)}
                />
            )}
        </>
    );
};

export default ChatModal;
