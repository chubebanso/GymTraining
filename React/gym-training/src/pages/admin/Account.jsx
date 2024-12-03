import { Routes, Route } from "react-router-dom";
import TableAccount from "../../components/admin/tableaccount/TableAccount";
import AddAccount from "../../components/admin/addaccount/AddAccount";
import EditAccount from "../../components/admin/editaccount/EditAccount";

const Account = () => {
  return (
    <Routes>
      <Route path="/" element={<TableAccount />} />
      <Route path="/add" element={<AddAccount />} />
      <Route path="/edit/:id" element={<EditAccount />} />
    </Routes>
  );
};

export default Account;
