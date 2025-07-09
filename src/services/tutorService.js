
const fetchRecentTutors = async () => {
    const res = await fetch("http://localhost:8080/api/v1/tutors/get-all-tutors");
    if (!res.ok) throw new Error("Failed to fetch recent tutors");
    return res.json();
};
  
const fetchFavoriteTutors = async () => {
    const res = await fetch("/api/tutors/favorites");
    if (!res.ok) throw new Error("Failed to fetch favorite tutors");
    return res.json();
};
  
const fetchTopTutors = async () => {
    const res = await fetch("/api/tutors/top-rated");
    if (!res.ok) throw new Error("Failed to fetch top-rated tutors");
    return res.json();
};
  
const fetchCurrentSessions = async () => {
    const res = await fetch("/api/sessions/current");
    if (!res.ok) throw new Error("Failed to fetch sessions");
    return res.json();
};

export { fetchCurrentSessions, fetchFavoriteTutors, fetchRecentTutors, fetchTopTutors };
  