import React, { useEffect, useState } from "react";
import { useEscapeClose } from "../utils/useEscapeClose";
import { useOutsideClick } from "../utils/useOutsideClick";
import { fetchRates } from "../services/rateService";
import { Trophy } from "lucide-react";
import PaginationControls from "../components/PaginationControls";
import LeaderboardList from "../components/LeaderboardList";

const ITEMS_PER_PAGE = 5;

const LeaderboardModal = ({ user, profilePictures, onClose }) => {
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

    if (!user) return (<h1>Please login</h1>);

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
            className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-sm"
        >
            <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md relative overflow-y-auto max-h-[90vh]">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl"
                >
                    ✕
                </button>

                <div className="mb-5 flex items-center gap-2">
                    <Trophy className="text-purple-500 w-5 h-5" />
                    <h2 className="text-xl font-bold text-gray-800">Tutor - Leaderboard</h2>
                </div>

                <LeaderboardList
                    currentRates={currentRates}
                    profilePictures={profilePictures}
                    startIndex={startIndex}
                />
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
