import "./App.css";
import WorkoutContextProvide from "./context/WorkoutContextProvider";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Error from "./pages/error/Error";
import Account from "./pages/admin/Account";
import Schedule from "./pages/user/Schedule";
import Layout from "./components/user/layout/Layout";
import Home from "./pages/user/Home";
import LayoutAdmin from "./components/admin/layout/LayoutAdmin";
import WorkOut from "./pages/admin/Workout";
import { useEffect } from "react";

const AppRoutes = () => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("role");

  useEffect(() => {
    if (!userRole) {
      navigate("/login");
    }
  }, [userRole, navigate]);

  return (
    <Routes>
      {userRole === "USER" && (
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/schedule" element={<Schedule />} />
        </Route>
      )}
      {userRole === "ADMIN" && (
        <Route element={<LayoutAdmin />}>
          <Route path="/admin/account/*" element={<Account />} />
          <Route path="/admin/workout/*" element={<WorkOut />} />
        </Route>
      )}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

function App() {
  return (
    <WorkoutContextProvide>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </WorkoutContextProvide>
  );
}

export default App;
