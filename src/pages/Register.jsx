import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {

    const navigate = useNavigate();

    const [ username, setUsername ] = useState('');
    const [ email, setEmail ]= useState('');
    const [ password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/api/v1/users/registration', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
                credentials: "include",
                body: JSON.stringify({ username, email, password }),
            })

            if (response.ok) {
                const data = await response.text();
                alert(data);

                setUsername("");
                setPassword("");
                setEmail("");
            } else {
                const errorData = await response.text();
                alert(errorData);
                setUsername("");
                setPassword("");
                setEmail("");
            }
            
        } catch (e) {
            alert(e);
        }
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md border border-gray-100"
        >
          <h2 className="text-2xl font-semibold text-purple-600 mb-6 text-center">Sign Up</h2>
      
          <input
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
            required
          />
      
          <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
            required
          />
      
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
            required
          />
      
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
          >
            Sign Up
          </button>
      
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">Already have an account?</p>
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="mt-2 text-purple-600 font-medium hover:underline"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
      

    );
}

export default Register;