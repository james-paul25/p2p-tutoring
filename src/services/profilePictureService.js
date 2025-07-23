const API_BASE_URL = import.meta.env.VITE_API_URL;
const fetchProfilePicture = async (userId) => {
    try {
    const res = await fetch(`${API_BASE_URL}/api/v1/profile-picture/get-profile/${userId}`, {
      credentials: "include",
    });

    if (res.status === 404) {
      return null;
    }

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(errText);
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching profile picture:", error.message);
    throw error;
  }
}

const fetchAllProfilePicture = async () => {
    const res = await fetch(`${API_BASE_URL}/api/v1/profile-picture/get-all-profiles`);
    if (!res.ok) throw new Error("Fetching profile picture failed");
    return res.json();
}

export { fetchProfilePicture, fetchAllProfilePicture };
