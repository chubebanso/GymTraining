import "./App.css";
import WorkoutContextProvide from "./context/WorkoutContext";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Error from "./pages/error/Error";
import Account from "./pages/admin/Account";
import Schedule from "./pages/user/Schedule";
import Layout from "./components/user/layout/Layout";
import HomeAdmin from "./pages/admin/HomeAdmin";
import Home from "./pages/user/Home";
import LayoutAdmin from "./components/admin/layout/LayoutAdmin";
import WorkOut from "./pages/admin/Workout";
import { useEffect } from "react";
import UserInfo from "./pages/user/UserInfo";
import UserWorkout from "./pages/user/UserWorkout";
import UserWorkoutDetail from "./pages/user/UserWorkoutDetail";
import VideoPlayer from "./components/user/workoutdetail/VideoPlayer.jsx";
import Performance from "./pages/user/Performance";

const AppRoutes = () => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("role");

  useEffect(() => {
    if (!userRole && window.location.pathname !== "/login" && window.location.pathname !== "/register") {
      navigate("/login");
    }
  }, [userRole, navigate]);

  return (
    <Routes>
      {userRole === "USER" && (
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/userinfo/*" element={<UserInfo />} />
          <Route path="/performance" element={<Performance /> } />
          <Route path="/userworkout" element={<UserWorkout />} />
          <Route path="/userworkoutdetail/:schedule_id/:workout_id" element={<UserWorkoutDetail />} />
          <Route path="/workout/video/:id" element={<VideoPlayer />} />
        </Route>
      )}
      {userRole === "ADMIN" && (
        <Route element={<LayoutAdmin />}>
          <Route path="/admin/home" element={<HomeAdmin />} />
          <Route path="/admin/account/*" element={<Account />} />
          <Route path="/admin/workout/*" element={<WorkOut />} />
        </Route>
      )}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/*" element={<Error />} />
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
