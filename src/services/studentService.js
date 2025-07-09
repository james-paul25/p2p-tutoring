const getStudentInfo = async (userId) => {
    const res = await fetch(`http://localhost:8080/api/v1/users/get-student-info/${userId}`);
    if (!res.ok) throw new Error("Failed to fetch student info");
    return res.json();
}

export { getStudentInfo };