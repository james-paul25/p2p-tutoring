const fetchSubjects = async () => {
    const res = await fetch('http://localhost:8080/api/v1/subjects/get-all-subjects', {
        method: 'GET',
    });
    if (!res.ok) throw new Error("Failed to fetch subjects");
    return res.json();
}

export { fetchSubjects };