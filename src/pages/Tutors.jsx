import React from "react";

const Tutors = ({ user }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md space-y-10 transition">
            <p>TUTORS LIST</p>
            <p>{user.username}</p>
            <p>{user.role}</p>
        </div>
    );
}

export default Tutors;