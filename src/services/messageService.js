const fetchMessages = async (sessionId) => {
    const res = await fetch(`http://localhost:8080/api/v1/messages/get-messages/${sessionId}`);
    if (!res.ok) throw new Error("Error fetching messages");
    return res.json();
}

export { fetchMessages };