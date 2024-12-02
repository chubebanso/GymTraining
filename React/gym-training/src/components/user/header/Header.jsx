// import React from 'react'
import "./Header.css"
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <img src="" alt="logo" />
      <div className="navbar">
        <Link to="/">Home</Link>
        <Link to="/schedule">Schedule</Link>
        <Link>Workouts</Link>
        <Link>Squad</Link>
        <Link>Performance</Link>
      </div>
      <img src="" alt="avatar" />
    </div>
  )
}

export default Header