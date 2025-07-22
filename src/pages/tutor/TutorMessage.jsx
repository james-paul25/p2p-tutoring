import React, { useState } from "react";
import ChatCard from "../../components/ChatCard";
import ChatModal from "../../modals/ChatModal";
import { MessageSquare } from "lucide-react";

const TutorMessage = ({ sessions, profilePictures }) => {
    const [selectedSession, setSelectedSession] = useState(false);

    return (
        <>
            <div className="bg-white p-6 rounded-lg shadow-md space-y-10 transition">
                <div className="flex items-center gap-2 mb-6">
                    <MessageSquare className="w-6 h-6 text-purple-600" />
                    <h2 className="text-2xl font-bold">Messages</h2>
                </div>

                <div className="">
                    <div className="flex flex-col gap-4">
                        {sessions.length > 0 ? (
                            sessions.map((ses) => (
                                <React.Fragment key={ses.sessionId}>
                                    <ChatCard
                                        session={ses}
                                        profilePictures={profilePictures}
                                        onClick={() => setSelectedSession(ses)}
                                        currentUserRole={"TUTOR"}
                                    />

                                    {selectedSession?.sessionId === ses.sessionId && (
                                        <ChatModal
                                            session={ses}
                                            currentUserRole="TUTOR"
                                            profilePictures={profilePictures}
                                            onClose={() => setSelectedSession(null)}
                                        />
                                    )}
                                </React.Fragment>
                            ))
                        ) : (
                            <p className="text-gray-500 text-center">
                                No sessions yet. Apply for the session to<br /> start messaging with the tutor.
                            </p>
                        )}
                    </div>

                </div>
            </div>

        </>
    );
};

export default TutorMessage;
