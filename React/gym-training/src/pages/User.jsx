import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../components/header/Header";
import Calendar from "../components/calendar/Calendar";
import Footer from "../components/footer/Footer";

const User = () => {
  return (
    <div>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Calendar />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
};

export default User;
