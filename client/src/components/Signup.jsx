import React, { useState } from 'react'
import '../css/signup.css'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast, Slide } from 'react-toastify';

const Signup = () => {
  const [authInfo, setAuthInfo] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const host = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuthInfo({ ...authInfo, [name]: value });
  };

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, role } = authInfo
    if (!name || !email || !password || !role) {
      alert("Please fill all the fields")
      return
    }
    try {
      const response = await fetch(`${host}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, role })
      })
      const data = await response.json()
      if (data.success) {
        localStorage.setItem("token", data.token)
        localStorage.setItem("role",role)
        toast.success('Successfully Signed Up', {
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
    <div className="signup-container">
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
      <div className="signup-box">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={authInfo.name}
              onChange={handleChange}
              required
            />
          </div>
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
            Sign Up
          </button>
        </form>
        <p className="login-message">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup
