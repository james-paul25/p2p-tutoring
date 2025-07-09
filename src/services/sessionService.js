const getSessionByStudent = async (studentId) => {
    const res = await fetch(`http://localhost:8080/api/v1/sessions/get-session-by-student/${studentId}`);

    if (res.status === 404) {
        return []; 
    }

    if (!res.ok) throw new Error("Failed to fetch sessions");
    return res.json();
}

export { getSessionByStudent };