const API_BASE_URL = import.meta.env.VITE_API_URL;
const check = async () => {
    const res = await fetch(`${API_BASE_URL}/api/v1/auth/check`, {
        method: "GET",
        credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to check");
    return res.json();

}

export { check };