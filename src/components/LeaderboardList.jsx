import React from "react";
import { Star } from "lucide-react";

const LeaderboardList = ({ currentRates, profilePictures, startIndex }) => {
    return (
        <div className="space-y-3">
            {currentRates.length === 0 ? (
                <p className="text-center text-gray-500">No ratings yet.</p>
            ) : (
                currentRates.map((rate, index) => {
                    const tutor = rate.tutor;
                    const matchedPic = profilePictures.find(
                        (pic) => pic?.user?.userId === tutor?.user?.userId
                    );
                    const imageUrl = matchedPic
                        ? `http://localhost:8080${matchedPic.filePath}`
                        : "/default-avatar.png";

                    return (
                        <div
                            key={index}
                            className="flex justify-between items-center bg-gray-100 px-4 py-3 rounded-lg
                                       hover:bg-gray-200 hover:shadow-md hover:scale-[1.01] transition duration-200"
                        >
                            <div className="flex items-center gap-3">
                                <img
                                    src={imageUrl}
                                    alt="Profile"
                                    className="w-8 h-8 rounded-full object-cover"
                                />
                                <div>
                                    <p className="font-semibold text-sm text-gray-800">
                                        #{startIndex + index + 1} {tutor?.user?.username || "Unknown"}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        GWA: {tutor?.gwa ?? "N/A"}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <Star className="text-yellow-400 w-4 h-4" />
                                <span className="text-sm font-medium text-gray-700">
                                    {rate.averageRating?.toFixed(2)}
                                </span>
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
};

export default LeaderboardList;
