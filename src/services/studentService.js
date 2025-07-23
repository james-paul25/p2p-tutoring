const API_BASE_URL = import.meta.env.VITE_API_URL;
const getStudentInfo = async (userId) => {
    const res = await fetch(`${API_BASE_URL}/api/v1/users/get-student-info/${userId}`);
    if (!res.ok) throw new Error("Failed to fetch student info");
    return res.json();
}

export { getStudentInfo };