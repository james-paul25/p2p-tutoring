import React from "react";

const Tutors = ({ user }) => {
    return (
        <div>
            <p>TUTORS LIST</p>
            <p>{user.username}</p>
            <p>{user.role}</p>
        </div>
    );
}

export default Tutors;