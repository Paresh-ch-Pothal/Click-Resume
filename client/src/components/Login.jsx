import React, { useState } from "react";
import '../css/login.css';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast, Slide } from 'react-toastify';

const Login = () => {
  const [authInfo, setAuthInfo] = useState({
    email: "",
    password: "",
    role: "user",
  });

  const host = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuthInfo({ ...authInfo, [name]: value });
  };

  const navigate=useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, role } = authInfo
    if (!email || !password || !role) {
      toast.warning('Please Fill Up All Details', {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Slide,
      });
      return
    }
    try {
      const response = await fetch(`${host}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, role })
      })
      const data = await response.json()
      if (data.success) {
        localStorage.setItem("token", data.token)
        localStorage.setItem("role", role)
        toast.success('Successfully Login', {
          position: "bottom-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Slide,
        });
        setTimeout(() => {
          navigate("/home")
        }, 1000);
        
      }
      else {
        toast.error(`${data.message}`, {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Slide,
        });
      }
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="login-container">
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Slide}
      />
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={authInfo.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={authInfo.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label>Role</label>
            <select
              name="role"
              value={authInfo.role}
              onChange={handleChange}
              required
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit" className="submit-btn">
            Login
          </button>
        </form>
        <p className="signup-message">
          Don't have an account? <Link to='/signup'>Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
