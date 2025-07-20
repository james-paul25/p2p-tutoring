import React, { useState, useMemo, useEffect } from "react";
import SessionCard from "../../components/SessionCard";
import SearchBar from "../../components/SearchBar";
import FilterDropdown from "../../components/FilterDropdown";
import { debounce } from "../../utils/debounce";
import SessionModal from "../../modals/SessionModal";
import { setStatusComplete } from "../../services/sessionService";

import { Users } from "lucide-react";

const Session = ({ user, session, profilePictures }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedSession, setSelectedSession] = useState(null);

  const debouncedChangeHandler = useMemo(
    () =>
      debounce((value) => {
        setDebouncedSearch(value);
      }, 400),
    []
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    debouncedChangeHandler(searchTerm);
  };

  useEffect(() => {
    const updateCompletedSessions = async () => {
      if (!session || !user) return;

      const notCompletedSessions = session.filter(
        (s) =>
          s?.student?.user?.userId === user?.userId &&
          s?.sessionStatus !== "COMPLETED"
      );

      for (const s of notCompletedSessions) {
        try {
          const result = await setStatusComplete({ sessionId: s.sessionId });
          console.log(`Session ${s.sessionId} update:`, result);
        } catch (err) {
          console.error("Error updating session:", s.sessionId, err);
        }
      }
    };

    updateCompletedSessions();
  }, [session, user]);



  const filteredSessions = session.filter((session) => {
    const fullName = `${session?.tutor?.student?.fullName}`.toLowerCase();
    const subject = session?.subject?.subjectDescription?.toLowerCase() || "";

    const combinedFields = `${fullName} ${subject}`;
    const matchesSearch = combinedFields.includes(debouncedSearch.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" || session.sessionStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const statusOptions = [
    { value: "ALL", label: "Status" },
    { value: "PENDING", label: "Pending" },
    { value: "APPROVED", label: "Approved" },
    { value: "REJECTED", label: "Rejected" },
    { value: "COMPLETED", label: "Completed" },
  ];

  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-md space-y-10 transition">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Users className="text-blue-600 w-6 h-6" />
            <h1 className="text-2xl font-bold text-gray-800">Your Session</h1>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <SearchBar
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search your session..."
            />
            <FilterDropdown
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={statusOptions}
              label="Status"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {filteredSessions.length > 0 ? (
            filteredSessions.map((sesh) => (
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
      </div>
      {selectedSession && (
        <SessionModal
          session={selectedSession}
          profilePictures={profilePictures}
          onClose={() => {
            setSelectedSession(null);
          }}
        />
      )}
    </>
  );
};

export default Session;
