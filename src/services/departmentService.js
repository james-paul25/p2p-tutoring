const fetchDepartment = async () => {
    const res = await fetch('http://localhost:8080/api/v1/departments/get-all-department');
    if (!res.ok) throw new Error("Failed to fetch departments");
    return res.json();
}

export { fetchDepartment };