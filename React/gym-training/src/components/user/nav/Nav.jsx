import "./Nav.css";
import ava_account from "../../../assets/ava_account.png";
import {
  UserOutlined,
  SettingOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="nav">
      <div className="user">
        <img src={ava_account} alt="avatar" />
        <div className="user-info">
          <span>User</span>
          <span>theliems@gmail.com</span>
        </div>
      </div>
      <div className="nav-user">
        <div className="navbar-account">
          <UserOutlined />
          <Link to="/userinfo/profile">Profile</Link>
        </div>
        <div className="navbar-account">
          <SettingOutlined />
          <Link to="/userinfo/setting">Setting</Link>
        </div>
      </div>
      <div className="nothing"></div>
      <div className="logout" onClick={handleLogout}>
        <PoweroffOutlined />
        <span>Logout</span>
      </div>
    </div>
  );
};

export default Nav;
