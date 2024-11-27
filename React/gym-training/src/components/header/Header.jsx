// import React from 'react'
import "./Header.css"
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <img src="" alt="logo" />
      <div className="navbar">
        <span>Home</span>
        <Link to="/schedule">Schedule</Link>
        <span>Workouts</span>
        <span>Squad</span>
        <span>Nutrition</span>
        <span>Performance</span>
      </div>
      <img src="" alt="avatar" />
    </div>
  )
}

export default Header