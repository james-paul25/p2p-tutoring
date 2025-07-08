import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({onLogin}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
                const data = response.json();
                console.log(data);
                console.log(data?.message);
                onLogin();
                alert(data.message);
                navigate("/home", { replace: true });
            } 
            
        } catch (e) {
            alert(e);
        }
        
    }

    return (
        <>
            <form onSubmit={handleLogin}>
                <input type="email"
                    value={email}
                    placeholder="Email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                /><br />
                 <input type="password"
                    value={password}
                    placeholder="Password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                /><br />
                <button type="submit">Sign In</button>
                
            </form>
        </>
    );
}

export default Login;