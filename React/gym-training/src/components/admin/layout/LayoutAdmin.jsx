import { Outlet } from "react-router-dom";
import HeaderAdmin from "../headeradmin/HeaderAdmin";
import Sidebar from "../sidebar/Sidebar";
import "./LayoutAdmin.css";

const Layout = () => {
  return (
    <>
    <HeaderAdmin />
      <Sidebar />
      <main className="main-admin">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
