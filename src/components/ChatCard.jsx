import React from "react";
import Avatar from "../assets/prof.jpg";
import { ChevronRight } from "lucide-react";

const ChatCard = ({ session, profilePictures, onClick, currentUserRole }) => {
    const isStudent = currentUserRole === "STUDENT";
    const otherUser = isStudent ? session.tutor?.user : session.student?.user;

    const matchedPic = profilePictures.find(
        (pic) => pic?.user?.userId === otherUser?.userId
    );

    const imageUrl = matchedPic
        ? `http://localhost:8080${matchedPic.filePath}`
        : Avatar;

    const fullName = isStudent
        ? session.tutor?.fullName || "Tutor"
        : session.student?.fullName || "Student";

    return (
        <div
            onClick={onClick}
            className="bg-white hover:bg-gray-50 shadow rounded-lg p-4 flex items-center justify-between cursor-pointer"
        >
            <div className="flex items-center gap-4">
                <img
                    src={imageUrl}
                    alt={fullName}
                    className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                    <h3 className="font-semibold text-purple-900">{fullName}</h3>
                    <p className="text-sm text-gray-500">
                        <span>message here</span>
                    </p>
                </div>
            </div>

            <ChevronRight className="text-gray-400" />
        </div>
    );
};

export default ChatCard;
