import "./Login.css";
import login_image from "../../assets/login_image.png";
import { UserOutlined } from "@ant-design/icons";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input, Button, Checkbox, message } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async () => {
    if (!username || !password) {
      message.error("Please enter both email and password.");
      return;
    }

    const loginData = {
      username,
      password,
    };

    try {
      const response = await axios.post("http://localhost:8080/api/v1/login", loginData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.statusCode === 200) {
        const { accessToken, userLogin, role } = response.data.data;
        
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("user", JSON.stringify(userLogin));
         localStorage.setItem("role", role.name);
        message.success("Login successful!");

        // Check the role and navigate accordingly
        if (role.name === "ADMIN") {
          navigate("/admin/home");  // Admin redirect
        } else {
          navigate("/");  // User redirect
        }
      } else {
        message.error(response.data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      message.error("An error occurred. Please try again.");
      console.error(error);
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
            value={password}
            onChange={handlePasswordChange}
          />
          <div className="login-checkbox">
            <Checkbox>Remember me</Checkbox>
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
          <span>Don't have an account?</span>
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
