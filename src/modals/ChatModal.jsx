import React from "react";
import { useOutsideClick } from "../utils/useOutsideClick";

const ChatModal = ({ user, onClose }) => {

    useOutsideClick("chatBackdrop", onClose);

    return (
        <>
        <div
            id="chatBackdrop"
            className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-sm"
        >
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
                <h1>{user.username}</h1>
            </div>
        </div>
        </>
    );
}

export default ChatModal;