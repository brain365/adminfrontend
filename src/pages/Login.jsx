
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseurl } from "../config/baseurl";

const Login = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${baseurl}/api/user/login`, {
                email: email,
                password: password,
            });

            localStorage.setItem('authToken', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data))         
            console.log(response.data._id);
            alert("login successfully")
            if (response.data.role === "admin") {
                navigate(`/user-details/${response.data._id}`)
            }else{
                navigate('/')
            }

        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div>
            <div>
                <h1>Login</h1>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button onClick={handleLogin}>Login</button>
            </div>
        </div>
    )
}

export default Login
