import "./Header.css"
import { Link } from "react-router-dom";
import ava_account from "../../../assets/ava_account.png"
import logo_admin from "../../../assets/logo_admin.png"

const Header = () => {
  return (
    <div className="header">
      <img src={logo_admin} alt="logo" className="logo"/>
      <div className="navbar">
        <Link to="/">Home</Link>
        <Link to="/schedule">Schedule</Link>
        <Link>Workouts</Link>
        <Link>Squad</Link>
        <Link>Performance</Link>
      </div>
      <img src={ava_account} alt="avatar" />
    </div>
  )
}

export default Header