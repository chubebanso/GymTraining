import "./App.css";
import WorkoutContextProvide from "./context/WorkoutContextProvider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Error from "./pages/error/Error";
import Account from "./pages/admin/Account";
import Schedule from "./pages/user/Schedule";
import Layout from "./components/user/layout/Layout";
import Home from "./pages/user/Home";
import LayoutAdmin from "./components/admin/layout/LayoutAdmin";

function App() {
  const userRole = "user";

  return (
    <WorkoutContextProvide>
      <BrowserRouter>
        <Routes>
          {/* Routes cho người dùng thông thường */}
          {userRole === "user" && (
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/schedule" element={<Schedule />} />
            </Route>
          )}
          {/* Routes cho Admin */}
          {userRole === "admin" && (
            <Route element={<LayoutAdmin />}>
              <Route path="/admin/account/*" element={<Account />} />
            </Route>
          )}
          {/* Routes cho trang đăng nhập và đăng ký */}
          <Route path="/login" element={<Login />} /> {/* Đăng nhập */}
          <Route path="/register" element={<Register />} /> {/* Đăng ký */}
          {/* Route lỗi */}
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </WorkoutContextProvide>
  );
}

export default App;
