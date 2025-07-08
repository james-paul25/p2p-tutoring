import React, {useState} from "react";

const Register = () => {

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
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    <input value={username}
                        placeholder="username"
                        onChange={(e) => setUsername(e.target.value)}
                        /><br />
                    <input value={email}
                        type="email"
                        placeholder="email"
                        onChange={(e) => setEmail(e.target.value)}
                        /><br />
                    <input value={password}
                        type="password"
                        placeholder="password"
                        onChange={(e) => setPassword(e.target.value)}
                        /><br />
                    <button type="submit">
                        Sign Up
                    </button>
                </form>
            </div>
        </>
    );
}

export default Register;