import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";


const Login = ({ onLogin }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/v1/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        onLogin(data);
        console.log("Data: ", data)
        alert(data.message);
      } else {
        alert("Signing in failed");
      }

    } catch (e) {
      alert(e);
    }

  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md border border-gray-100"
      >
        <h2 className="text-2xl font-semibold text-purple-600 mb-6 text-center">Sign In</h2>

        <input
          type="email"
          value={email}
          placeholder="Email"
          required
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
        />

        <div className="relative mb-6">
          <input
            type={passwordVisible ? "text" : "password"}
            value={password}
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
          />
          <button
            type="button"
            onClick={() => setPasswordVisible((prev) => !prev)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {passwordVisible ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>


        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
        >
          Sign In
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">Don’t have an account?</p>

        <button
          type="button"
          onClick={() => navigate("/signup")}
          className="w-full mt-2 border border-purple-500 text-purple-600 py-2 rounded-md hover:bg-purple-100 transition"
        >
          Sign Up
        </button>
      </form>
    </div>

  );
}

export default Login;