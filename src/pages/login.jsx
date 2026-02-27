import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../api";
import {message} from 'antd'


const Login = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [user, setUser] = useState({
    email: "",
    password: ""
  })
  const [isLoading, setisLoading] = useState(false)

  const handleLogin = async () => {
    try {
      setisLoading(true);
      const response = await api.post("/login", {
        email: user.email,
        password: user.password
      });
      message.success("Login successful!");
      localStorage.setItem("token", response.data.token);
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Login failed:", error.message);
      message.error("Login failed. Please try again.");
    }finally {
      setisLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <h2>Login Page</h2>
        <div>
          <input  type="email" placeholder="Enter email" className="custom-input" value={user.email} onChange={(e) => setUser({...user, email : e.target.value})} />
        </div>
        <div>
          <input  type="password" placeholder="Enter password" className="custom-input" value={user.password} onChange={(e) => setUser({...user, password: e.target.value})} />
        </div>
      <button onClick={handleLogin}>{isLoading ? "Logging in..." : "Login"}</button>
    </div>
  );
};

export default Login;