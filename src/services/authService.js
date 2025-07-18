const check = async () => {
    const res = await fetch(`http://localhost:8080/api/v1/auth/check`, {
        method: "GET",
        credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to check");
    return res.json();

}

export { check };