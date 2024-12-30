import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function useAuth() {
  const accessToken = localStorage.getItem("accessToken");
  const role = localStorage.getItem("role"); // Get the role from localStorage
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      // Redirect to login if no access token
      navigate("/login");
    } else if (role === "ADMIN") {
      // Redirect admin to the admin dashboard
      navigate("/admin/home");
    } else if (role === "USER") {
      // Redirect regular user to the main dashboard
      navigate("/");
    } else {
      // Handle unknown roles
      console.error("Unknown role detected:", role);
      navigate("/error"); // Redirect to an error page or handle accordingly
    }
  }, [accessToken, role, navigate]);
}
