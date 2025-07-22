const getSessionByStudent = async (studentId) => {
  const res = await fetch(`http://localhost:8080/api/v1/sessions/get-session-by-student/${studentId}`);

  if (res.status === 404) {
    return [];
  }

  if (!res.ok) throw new Error("Failed to fetch sessions");
  return res.json();
}

const fetchSessionByTutor = async (tutorId) => {
  const res = await fetch(`http://localhost:8080/api/v1/sessions/get-session-by-tutor/${tutorId}`);

  if (res.status === 404) {
    return [];
  }

  if (!res.ok) throw new Error("Failed to fetch session.");
  return res.json();
}

const setStatusComplete = async ({ sessionId }) => {
  try {
    const response = await fetch(`http://localhost:8080/api/v1/sessions/update-status-completed/${sessionId}`, {
      method: 'PUT',
      credentials: "include",
    });

    return response.text();
  } catch (error) {
    return error.message;
  }
};

const updateSessionStatus = async ({ sessionId, sessionStatus }) => {
  console.log("from service: ", sessionId);
  try {
    const res = await fetch(`http://localhost:8080/api/v1/sessions/update-status/${sessionId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ status: sessionStatus }),
    });

    if (!res.ok) throw new Error("Error approving session.");

    return await res.text();

  } catch (e) {
    return e;
  }
}


export { getSessionByStudent, fetchSessionByTutor, setStatusComplete, updateSessionStatus };
