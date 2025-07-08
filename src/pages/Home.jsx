import React from "react";
import { useNavigate } from "react-router-dom";

const Home = ({ onLogout }) => {
    
    const navigate = useNavigate();

    const handleLogout = async () => {
        await fetch('http://localhost:8080/api/v1/auth/logout', {
            method: 'POST',
            credentials: 'include',
        });
        onLogout();
        navigate("/login", {
            replace: true
        });
    }

    return (
        <>
            <h1>HOME</h1>
            <button onClick={handleLogout}>Logout</button>
        </>
    );
}

export default Home;