import "./TableAccount.css"
import {  Pagination } from "antd"
import { useState } from "react"
import AccountItem from "../accountitem/AccountItem"
import { useNavigate} from "react-router-dom"

const TableAccount = () => {
  const navigate = useNavigate();

  const accountList = Array.from({ length: 40 }, (_, index) => ({

    name: `User ${index + 1}`,
    email: `user${index + 1}@example.com`,
    phone: `+123456789${index + 1}`,
    gConnected: 'No',
    accountID: `account${index + 1}`,
    role: index % 2 === 0 ? 'Admin' : 'User', // Ví dụ với 2 vai trò: Admin và User
  }));

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;

  // Hàm thay đổi trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAddBtn = () => {
    navigate("add");
  }

  // Cắt dữ liệu theo trang
  const pagesData = accountList.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  return (
    <div className="content-account">
        <div className="table-account-filter">
            <div className="equal-addbtn"></div>
            <input type="search" placeholder="Filter by name" />
            <button className="btn-add" onClick={handleAddBtn}>Add new account</button>
        </div>
        <div className="table-account-header">
          <span>Avatar</span>
          <span>Name</span>
          <span>Email</span>
          <span>G.Connected</span>
          <span>Phone</span>
          <span>AccountID</span>
          <span>Role</span>
          <span>Edit</span>
          <span>Delete</span>
        </div>
        <div className="table-account-list">
          {pagesData.map((account, index) => (
            <AccountItem key={index} account={account} />
          ))}
        </div>
        <div className="table-account-pagination">
            <Pagination pageSize={pageSize}
          total={accountList.length}
          current={currentPage}
          onChange={handlePageChange}/>
        </div>
    </div>
  )
}

export default TableAccount