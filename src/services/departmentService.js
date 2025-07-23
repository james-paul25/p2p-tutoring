const API_BASE_URL = import.meta.env.VITE_API_URL;
const fetchDepartment = async () => {
    const res = await fetch(`${API_BASE_URL}/api/v1/departments/get-all-department`);
    if (!res.ok) throw new Error("Failed to fetch departments");
    return res.json();
}

export { fetchDepartment };