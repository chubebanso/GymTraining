import "./Login.css";
import login_image from "../../assets/login_image.png";
import { UserOutlined } from "@ant-design/icons";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input, Button } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import useAuth from "./useAuth";

const Register = () => {
  useAuth();
  //const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  // Hàm xử lý thay đổi input password
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  // Hàm xử lý khi người dùng nhấn nút đăng nhập
  const handleSubmit = async () => {
    // Kiểm tra nếu username và password không trống
    if (!username || !password || !confirmPassword) {
      alert("Vui lòng điền đầy đủ tài khoản và mật khẩu");
      return;
    }

    if (password !== confirmPassword) {
      alert("Mật khẩu xác nhận không khớp");
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/v1/users', {
        email: username,
        password: password,
        roleName: "USER"
      });
      if (response.status === 201) {
        alert("Đăng ký thành công");
        // navigate('/login'); // Uncomment this line if you want to navigate to login page after successful registration
      }
    } catch (error) {
      alert("Đăng ký thất bại: " + error.response.data.message);
    }
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
          <label>Confirm Password</label>
          <Input.Password
            placeholder="Enter your password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            className="input-confirmpassword"
            value={confirmPassword} // Gán giá trị state vào input
            onChange={handleConfirmPasswordChange} // Lắng nghe sự thay đổi
          />
          <Button
            type="primary"
            className="login-btn"
            danger
            onClick={handleSubmit}
          >
            Sign up
          </Button>
          <Button block className="login-btn">
            Sign in with Google
          </Button>
        </div>
        <div className="login-to-signup">
          <span>Already have an account?</span>
          <Link to="/login">Login</Link>
        </div>
      </div>
      <div className="login-img">
        <img src={login_image} alt="login_image" />
      </div>
    </div>
  );
};
export default Register;
