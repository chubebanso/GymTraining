import "./Header.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ava_account from "../../../assets/ava_account.png";
import logo_admin from "../../../assets/logo_admin.png";
import { useState, useEffect, useRef } from "react";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location
  const dropdownRef = useRef(null); // Ref for the dropdown menu

  const toggleMenu = () => {
    setShowMenu(!showMenu); // Toggle the dropdown menu
  };

  const handleLogout = () => {
    // Clear all data from localStorage
    localStorage.clear();
    navigate("/login"); // Redirect to the login page
  };

  const handleInfo = () => {
    navigate("/userinfo/profile");
  };

  const handleSetting = () => {
    navigate("/userinfo/setting");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowMenu(false); // Close the dropdown menu
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Function to check if a link is active
  const isActive = (path) => location.pathname === path;

  return (
    <div className="header">
      <img src={logo_admin} alt="logo" className="logo" />
      <div className="navbar">
        <Link to="/" className={isActive("/") ? "active" : ""}>
          Home
        </Link>
        <Link to="/schedule" className={isActive("/schedule") ? "active" : ""}>
          Schedule
        </Link>
        <Link to="/userworkout" className={isActive("/userworkout") ? "active" : ""}>
          Workouts
        </Link>
        <Link to="/performance" className={isActive("/performance") ? "active" : ""}>
          Performance
        </Link>
      </div>
      <div className="avatar-container" ref={dropdownRef}>
        <img
          src={ava_account}
          alt="avatar"
          className="avatar"
          onClick={toggleMenu} // Toggle menu on avatar click
        />
        {showMenu && (
          <div className="dropdown-menu">
            <button onClick={handleInfo} className="logout-button">
              User Info
            </button>
            <button onClick={handleSetting} className="logout-button">
              Setting
            </button>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
