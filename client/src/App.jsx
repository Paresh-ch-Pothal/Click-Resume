import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from './components/Navbar';
import Welcome from './components/Welcome';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import UserUpload from './components/UserUpload';
import AdminDashboard from './components/AdminDashboard';
import About from './components/About';
import Contact from './components/Contact';


function App() {

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          {/* <Route path="/userupload" element={<UserUpload />} />
          <Route path="/admindash" element={<AdminDashboard />} /> */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
    </Router>
    </>
  )
}

export default App
