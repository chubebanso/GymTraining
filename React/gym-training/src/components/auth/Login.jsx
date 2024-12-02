import "./Login.css";
import login_image from "../../assets/login_image.png";
import { UserOutlined } from "@ant-design/icons";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input, Button, Checkbox } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  //const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  // Hàm xử lý thay đổi input password
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Hàm xử lý khi người dùng nhấn nút đăng nhập
  const handleSubmit = () => {
    // Kiểm tra nếu username và password không trống
    if (!username || !password) {
      alert("Vui lòng điền đầy đủ tài khoản và mật khẩu");
      return;
    }

    // Gửi request đăng nhập (dưới đây là ví dụ gửi request giả)
  };
  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  return (
    <div className="login">
      <div className="login-form">
        <div className="login-label">
          <h2>Welcome Back</h2>
          <span>Welcome back! Please enter your details</span>
        </div>
        <div className="login-form-input">
          <label>Email</label>
          <Input
            placeholder="Enter your email"
            prefix={<UserOutlined />}
            value={username}
            className="input-username"
            onChange={handleUsernameChange}
          />
          <label>Password</label>
          <Input.Password
            placeholder="Enter your password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            className="input-password"
            value={password} // Gán giá trị state vào input
            onChange={handlePasswordChange} // Lắng nghe sự thay đổi
          />
          <div className="login-checkbox">
            <Checkbox onChange={onChange}>Remember me</Checkbox>
            <a href="#">Forgot Password</a>
          </div>
          <Button
            type="primary"
            className="login-btn"
            danger
            onClick={handleSubmit}
          >
            Login
          </Button>
          <Button block className="login-btn">
            Sign in with Google
          </Button>
        </div>
        <div className="login-to-signup">
          <span>Dont have an account?</span>
          <Link to="/register">Register</Link>
        </div>
      </div>
      <div className="login-img">
        <img src={login_image} alt="login_image" />
      </div>
    </div>
  );
};
export default Login;
