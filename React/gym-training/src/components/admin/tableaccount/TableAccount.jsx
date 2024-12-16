import "./TableAccount.css";
import { Pagination } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { useContext, useState } from "react";
import AccountItem from "../accountitem/AccountItem";
import { useNavigate } from "react-router-dom";
import { WorkoutContext } from "../../../context/WorkoutContext";
import { Modal } from "antd";
const { confirm } = Modal;

const TableAccount = () => {
  const navigate = useNavigate();
  const { users, deleteUser } = useContext(WorkoutContext);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;

  // Hàm thay đổi trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAddBtn = () => {
    navigate("add");
  };

  // Cắt dữ liệu theo trang
  const pagesData = users.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleEdit = (id) => {
    navigate(`edit/${id}`);
  };

  const handleDelete = (id) => {
    confirm({
      title: "Are you sure delete this account?",
      icon: <ExclamationCircleFilled />,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      async onOk() {
        console.log("OK");
        console.log(id);
        await deleteUser(id);

      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  return (
    <div className="content-account">
      <div className="table-account-filter">
        <div className="equal-addbtn"></div>
        <input type="search" placeholder="Filter by name" />
        <button className="btn-add" onClick={handleAddBtn}>
          Add new account
        </button>
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
        {pagesData.map((account) => (
          <AccountItem
            key={account.id}
            account={account}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
      <div className="table-account-pagination">
        <Pagination
          pageSize={pageSize}
          total={users.length}
          current={currentPage}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default TableAccount;
