const API_BASE_URL = import.meta.env.VITE_API_URL;
const fetchAllTutors = async () => {
    const res = await fetch(`${API_BASE_URL}/api/v1/tutors/get-all-tutors`);
    if (!res.ok) throw new Error("Failed to fetch recent tutors");
    return res.json();
};
  
const getFavoriteTutors = async () => {
    const res = await fetch(`${API_BASE_URL}/api/tutors/favorites`);
    if (!res.ok) throw new Error("Failed to fetch favorite tutors");
    return res.json();
};

const fetchTutorByUser = async (userId) => {
    const res = await fetch(`${API_BASE_URL}/api/v1/tutors/get-tutor-by-user/${userId}`);
    if (!res.ok) throw new Error("Failed to fetch tutor by user id");
    return res.json();
}
  

export { getFavoriteTutors, fetchAllTutors, fetchTutorByUser };
  