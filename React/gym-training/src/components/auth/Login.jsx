import "./Login.css";
import login_image from "../../assets/login_image.png";
import { UserOutlined } from "@ant-design/icons";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input, Button, Checkbox } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "./useAuth";
import { toaster, Toaster } from "../ui/toaster";

const Login = () => {
  useAuth();
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
      toaster.create({
        title: "All fields are required",
        type: "error",
      });
      return;
    }

    const loginData = {
      username,
      password,
    };

    const loginPromise = axios.post(
      "http://localhost:8080/api/v1/login",
      loginData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    toaster.promise(loginPromise, {
      loading: { title: "Logging in...", description: "Please wait." },
      success: {
        title: "Login Successful",
        description: "Welcome back!",
      },
      error: {
        title: "Login Failed",
        description: "An error occurred. Please try again.",
      },
    });

    try {
      const response = await loginPromise;

      if (response.data.statusCode === 200) {
        const { accessToken, userLogin, role } = response.data.data;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("user", JSON.stringify(userLogin));
        localStorage.setItem("role", role.name);

        // Delay navigation to allow toaster to complete
        setTimeout(() => {
          if (role.name === "ADMIN") {
            navigate("/admin/home");
          } else {
            navigate("/");
          }
        }, 2000); // 3 seconds delay
      } else {
        toaster.error({
          title: "Login Failed",
          description:
            response.data.message || "Login failed. Please try again.",
        });
      }
    } catch (error) {
      console.error(error);
      toaster.error({
        title: "Error",
        description: "An error occurred. Please try again.",
      });
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
      <Toaster />
    </div>
  );
};

export default Login;
