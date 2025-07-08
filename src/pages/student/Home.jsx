import React from "react";

const Home = ({ user }) => {

    console.log("data:", user)

  return (
      <div>
        <h2 className="text-2xl font-bold mb-4">Home Page Content</h2>
        <p>This is your dashboard, {user?.username || "guest"}!</p>
      </div>
  );
};

export default Home;
