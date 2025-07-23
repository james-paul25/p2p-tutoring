const API_BASE_URL = import.meta.env.VITE_API_URL;
const fetchMessages = async (sessionId) => {
    const res = await fetch(`${API_BASE_URL}/api/v1/messages/get-messages/${sessionId}`);
    if (!res.ok) throw new Error("Error fetching messages");
    return res.json();
}

export { fetchMessages };