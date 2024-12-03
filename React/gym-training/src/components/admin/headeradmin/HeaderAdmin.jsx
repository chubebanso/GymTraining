import logo_admin from "../../../assets/logo_admin.png";
import "./HeaderAdmin.css";
import { BellOutlined } from "@ant-design/icons";

import { Input} from "antd";
const { Search } = Input;


const onSearch = (value, _e, info) => console.log(info?.source, value);

const Header = () => {
  return (
    <div className="header-admin">
      <div className="admin-logo">
        <img src={logo_admin} alt="logo" />
      </div>
      <div className="admin-search-bar">
        <Search
          placeholder="input search text"
          allowClear
          size="large"
          onSearch={onSearch}
          className="admin-search-input"
        />
      </div>
      <div className="admin-notification">
      <BellOutlined style={{fontSize: '30px',}}/>
      </div>
    </div>
  );
};

export default Header;
