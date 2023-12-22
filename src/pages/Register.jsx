import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseurl } from "../config/baseurl";

const Register = () => {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState('');



const navigate = useNavigate()
    const handleRegister = async () => {
        try {
            const response = await axios.post(`${baseurl}/api/user/register`, {
                firstname: firstname,
                lastname: lastname,
                phone: phone,
                email: email,
                role: role,
                password: password,
            });
            if(response){
                navigate('/login')
            }
            alert("Rgister successfully")
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    return (
        <div>
            <div>
                <h1>Register</h1>
                <div className="mb-3">
                    <label>Firstname:</label>
                    <input
                        type="text"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label>Lastname:</label>
                    <input
                        type="text"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label>Phone:</label>
                    <input
                        type="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label>Role:</label>
                    <input
                        type="text"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button onClick={handleRegister}>Register</button>
            </div>

        </div>
    )
}

export default Register
