import Dashboard from "../../components/user/dashboard/Dashboard";
import useAuth from "../../components/auth/useAuth";
const Home = () => {
  useAuth();
  return (
    <div>
      <Dashboard />
    </div>
  );
};
export default Home;
