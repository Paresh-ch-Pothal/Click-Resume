import React from 'react'
import AdminDashboard from '../components/AdminDashboard'
import UserUpload from '../components/UserUpload'
import LoginOverlay from '../components/loginOverlay'

const Home = () => {
  return (
    <div>
      {localStorage.getItem("role") === "user" ? (
        <div className="home-container">
          <UserUpload/>
        </div>
      ) : localStorage.getItem("role") === "admin" ? (
        <div className="home-container">
          <AdminDashboard />
        </div>
      ) : (
        <div><LoginOverlay/></div>
      ) }
    </div>
  )
}

export default Home
