import React, { useEffect, useState } from "react";
import { useEscapeClose } from "../utils/useEscapeClose";
import { useOutsideClick } from "../utils/useOutsideClick";
import { fetchRates } from "../services/rateService";
import { Trophy, Star, User } from "lucide-react";
import PaginationControls from "../components/PaginationControls";

const ITEMS_PER_PAGE = 5;

const LeaderboardModal = ({ user, onClose }) => {
    useOutsideClick("leaderboardBackdrop", onClose);
    useEscapeClose(onClose);

    const [rates, setRates] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const getRates = async () => {
            try {
                const response = await fetchRates();
                const sorted = response.sort((a, b) => b.averageRating - a.averageRating);
                setRates(sorted);
            } catch (e) {
                console.error(e.message);
            }
        };

        getRates();
    }, []);

    if (!user) return (<><h1>Please login</h1></>);

    const totalPages = Math.ceil(rates.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentRates = rates.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    return (
        <div
            id="leaderboardBackdrop"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
        >
            <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md relative overflow-y-auto max-h-[90vh]">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl"
                >
                    ✕
                </button>

                {/* Header */}
                <div className="mb-5 flex items-center gap-2">
                    <Trophy className="text-purple-500 w-5 h-5" />
                    <h2 className="text-xl font-bold text-gray-800">Tutor Leaderboard</h2>
                </div>

                <div className="space-y-3">
                    {currentRates.length === 0 ? (
                        <p className="text-center text-gray-500">No ratings yet.</p>
                    ) : (
                        currentRates.map((rate, index) => (
                            <div
                                key={index}
                                className="flex justify-between items-center bg-gray-100 px-4 py-3 rounded-lg"
                            >
                                <div className="flex items-center gap-3">
                                    <img
                                        src={rate.tutor?.user?.profilePictureUrl || "/default-avatar.png"}
                                        alt="Profile"
                                        className="w-8 h-8 rounded-full object-cover"
                                    />
                                    <div>
                                        <p className="font-semibold text-sm text-gray-800">
                                            #{startIndex + index + 1} {rate.tutor?.user?.username || "Unknown"}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            GWA: {rate.tutor?.gwa ?? "N/A"}
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
                        ))
                    )}
                </div>

                <PaginationControls
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPrev={handlePrev}
                    onNext={handleNext}
                />

            </div>
        </div>
    );
};

export default LeaderboardModal;
