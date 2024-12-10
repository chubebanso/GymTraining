import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import ava_account from "../../../assets/ava_account.png";
import logo_admin from "../../../assets/logo_admin.png";
import { useState } from "react";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setShowMenu(!showMenu); // Bật / tắt menu thả xuống
  };

  const handleLogout = () => {
    localStorage.clear(); // Xóa tất cả thông tin trong localStorage
    navigate("/login"); // Điều hướng về trang đăng nhập
  };

  return (
    <div className="header">
      <img src={logo_admin} alt="logo" className="logo" />
      <div className="navbar">
        <Link to="/">Home</Link>
        <Link to="/schedule">Schedule</Link>
        <Link>Workouts</Link>
        <Link>Squad</Link>
        <Link>Performance</Link>
      </div>
      <div className="avatar-container">
        <img
          src={ava_account}
          alt="avatar"
          className="avatar"
          onClick={toggleMenu} // Hiển thị menu khi bấm vào avatar
        />
        {showMenu && (
          <div className="dropdown-menu">
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
