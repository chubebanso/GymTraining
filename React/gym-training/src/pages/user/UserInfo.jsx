import ChangePass from "../../components/user/changepass/ChangePass";
import Nav from "../../components/user/nav/Nav";
import Profile from "../../components/user/profile/Profile";
import Setting from "../../components/user/setting/Setting";
import { Route, Routes } from "react-router-dom";

const UserInfo = () => {
  return (
    <div className="userinfo">
      <Nav />
      <Routes>
        <Route path="profile" element={<Profile />} />
        <Route path="changepass" element={<ChangePass />} />
        <Route path="setting" element={<Setting />} />
      </Routes>
    </div>
  );
};

export default UserInfo;
