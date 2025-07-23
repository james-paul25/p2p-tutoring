const API_BASE_URL = import.meta.env.VITE_API_URL;
const fetchSubjects = async () => {
    const res = await fetch(`${API_BASE_URL}/api/v1/subjects/get-all-subjects`, {
        method: 'GET',
    });
    if (!res.ok) throw new Error("Failed to fetch subjects");
    return res.json();
}

export { fetchSubjects };