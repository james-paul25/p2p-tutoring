import React from "react";

const PaginationControls = ({ currentPage, totalPages, onPrev, onNext }) => {
    return (
        <div className="flex justify-between items-center mt-6 text-sm text-gray-600">
            <button
                onClick={onPrev}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded ${currentPage === 1
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-gray-200"
                    }`}
            >
                Previous
            </button>

            <span>
                Page {currentPage} of {totalPages}
            </span>

            <button
                onClick={onNext}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded ${currentPage === totalPages
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-gray-200"
                    }`}
            >
                Next
            </button>
        </div>
    );
};

export default PaginationControls;
