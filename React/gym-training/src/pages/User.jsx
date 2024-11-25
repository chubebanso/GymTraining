import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Schedule from "./Schedule";
import './css/Schedule.css'

const User = () => {
  return (
    <div className="user">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/schedule" element={<Schedule />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
};

export default User;
