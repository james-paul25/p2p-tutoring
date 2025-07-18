import React, {useState} from "react";
import SessionCard from "../../components/SessionCard";
import Chat from "../../modals/Chat";

const Message = ({ user, sessions, profilePictures }) => {
  const messages = [];
  const [selectedSession, setSelectedSession] = useState(null);

  console.log(messages || selectedSession);
  console.log(user);

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
                  sessions.map((sesh) => (
                    <SessionCard
                      key={sesh.sessionId}
                      session={sesh}
                      profilePictures={profilePictures}
                      onClick={() => setSelectedSession(sesh)}
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
        <Chat
          onClose={() => {
            setSelectedSession(null);
          }}
        />
      )}
    </>
  );
};

export default Message;
