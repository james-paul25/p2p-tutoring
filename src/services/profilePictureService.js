const fetchProfilePicture = async (userId) => {
    const res = await fetch(`http://localhost:8080/api/v1/profile-picture/get-profile/${userId}`);
    if (!res.ok) throw new Error("Fetching profile picture failed!");
    return res.json();
}

const fetchAllProfilePicture = async () => {
    const res = await fetch(`http://localhost:8080/api/v1/profile-picture/get-all-profiles`);
    if (!res.ok) throw new Error("Fetching profile picture failed");
    return res.json();
}

export { fetchProfilePicture, fetchAllProfilePicture };
