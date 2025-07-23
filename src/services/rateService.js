const rateTutor = async ({ studentId, tutorId, rating }) => {

    try {
        const res = await fetch(`http://localhost:8080/api/v1/rates/student-rate-tutor/${studentId}/${tutorId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ rating }),
        });

        return res.text();

    } catch (e) {
        return e;
    }
}

const fetchRates = async () => {
    const res = await fetch(`http://localhost:8080/api/v1/rates/rating`);
    if (!res.ok) throw new Error("Error fetching leaderboards");
    return res.json();
}

export { rateTutor, fetchRates };