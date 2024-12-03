import { Link } from "react-router-dom";
import ava_admin from "../../../assets/ava_admin.png";
import "./Sidebar.css";
import {
  HomeOutlined,
  UserOutlined,
  FireOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="admin-info">
        <img src={ava_admin} alt="avatar" />
        <div className="admin-info-email">
          <span>Admin</span>
          <span>theliems@gmail.com</span>
        </div>
      </div>
      <div className="navbar-admin">
        <div className="navbar-account">
          <HomeOutlined />
          <Link to="/admin/home">Home</Link>
        </div>
        <div className="navbar-account">
          <UserOutlined />
          <Link to="/admin/account">Account</Link>
        </div>
        <div className="navbar-account">
          <FireOutlined />
          <Link to="/admin/workout">Workout</Link>
        </div>
      </div>
      <div className="nothing"></div>
      <div className="logout">
        <PoweroffOutlined />
        <span>Logout</span>
      </div>
    </div>
  );
};

export default Sidebar;
