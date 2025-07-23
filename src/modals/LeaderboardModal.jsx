import React from "react";

const LeaderboardModal = ({ user }) => {

    return (
        <>
            <div
                id="leaderboardBackdrop"
                className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-sm"
            >
                <h1>{user.fullName}</h1>
            </div>

        </>
    );
}

export default LeaderboardModal;