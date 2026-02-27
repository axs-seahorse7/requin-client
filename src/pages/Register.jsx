import {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import {message} from 'antd'
import api from '../../api';


const Register = () => {
    const [user, setuser] = useState({
        username: "",
        email: "",
        role: "",
        password: ""
    })
    const navigate = useNavigate();

    const url = import.meta.env.VITE_API_URL || "http://localhost:3000"

    const handleRegister = async () => {
        try {
            const response = await api.post(`${url}/api/register`, {
                name: user.username,
                email: user.email,
                role: user.role,
                password: user.password
            });
            message.success("Registration successful! Please login.");
            console.log("Registration successful:", response.data);
            setuser({
                username: "",
                email: "",
                role: "",
                password: ""
            });
            navigate("/login");

        }
        catch (error) {
            console.error("Registration failed:", error.message);
            message.error("Registration failed. Please try again.");
        }
    }


  return (
    <div className='flex flex-col gap-5' >
        <h2>Register Page</h2>
        <div className="custom-input">
          <input type="text" placeholder="Enter username"  className="w-full outline-none focus:outline-none" value={user.username} onChange={(e) => setuser({...user, username: e.target.value})}/>
        </div>
        <div className="custom-input">
            <input type="email" placeholder="Enter email" className="w-full outline-none focus:outline-none" value={user.email} onChange={(e) => setuser({...user, email: e.target.value})} />
        </div>
        <div>
            <select name="role" id="" value={user.role} onChange={(e) => setuser({...user, role: e.target.value})} className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="" hidden >Select Role</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
            </select>
        </div>
        <div className="custom-input">
          <input type="password" placeholder="Enter password" className="w-full outline-none focus:outline-none" value={user.password} onChange={(e) => setuser({...user, password: e.target.value})} />
        </div>
        <button onClick={handleRegister}>Register</button>
    </div>
  )
}

export default Register