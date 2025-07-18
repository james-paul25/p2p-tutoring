import React from "react";
import Avatar from "../assets/prof.jpg";
import { ChevronRight } from "lucide-react";

const ChatCard = ({ session, profilePictures, onClick }) => {
    
    const matchedPic = profilePictures.find(
        (pic) => pic?.user?.userId === session?.tutor?.user?.userId
      );
    
      const imageUrl = matchedPic
        ? `http://localhost:8080${matchedPic.filePath}`
        : Avatar;
    

    return (
        <>
       <div
        onClick={onClick}
        className="bg-white hover:bg-gray-50 shadow rounded-lg p-4 flex items-center justify-between cursor-pointer"
        >
            <div className="flex items-center gap-4">
                <img
                src={imageUrl}
                alt={session?.tutor?.student?.fullName || "Tutor Avatar"}
                className="w-12 h-12 rounded-full"
                />
                <div>
                <h3 className="font-semibold text-purple-900">
                    {session?.tutor?.student?.fullName}
                </h3>
                <p className="text-sm text-gray-500">
                    <span>message here</span>
                </p>
                </div>
            </div>

            <ChevronRight className="text-gray-400" />
        </div>
        </>
    );
}

export default ChatCard;