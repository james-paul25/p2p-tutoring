import React, {useState} from "react";
import SessionCard from "../../components/SessionCard";
import ChatModal from "../../modals/ChatModal";

const Message = ({ user, sessions, profilePictures }) => {
  const [selectedSession, setSelectedSession] = useState(false);

  return (
    <>
    <div className="bg-white p-6 rounded-lg shadow-md space-y-10 transition">
      <h2 className="text-2xl font-bold mb-6 text-center">Messages</h2>

      <div className="">
        {sessions?.length === 0 ? (
          <p className="text-gray-500 text-center">No sessions yet. Apply for the session to<br/> start messaging with the tutor.</p>
        ) : (
          sessions.map(() => {

            return (
              <div className="flex flex-col gap-4">
                {sessions.length > 0 ? (
                  sessions.map((ses, index) => (
                    <SessionCard
                      key={index}
                      session={ses}
                      profilePictures={profilePictures}
                      onClick={() => setSelectedSession(true)}
                    />
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No sessions found.</p>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
    
    {selectedSession && (
        <ChatModal
          user={user}
          onClose={() => {
            setSelectedSession(false);
          }}
        />
      )}
    </>
  );
};

export default Message;
