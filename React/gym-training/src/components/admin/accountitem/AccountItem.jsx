import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import ava_account from "../../../assets/ava_account.png";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "./AccountItem.css";
import { Modal } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";

const { confirm } = Modal;

const AccountItem = () => {
  const [accounts, setAccounts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/users/getAll", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
          }
        });
        if (response.data && Array.isArray(response.data.data)) {
          setAccounts(response.data.data);
        } else {
          console.error("Unexpected response data format:", response.data);
        }
      } catch (error) {
        console.error("There was an error fetching the accounts!", error);
      }
    };

    fetchAccounts();
  }, []);

  const handleEditBtn = (account) => {
    navigate(`edit/${account.id}`, { state: { account } });
  };

  const handleDeleteBtn = (account) => {
    confirm({
      title: "Are you sure delete this account?",
      icon: <ExclamationCircleFilled />,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          await axios.delete(`http://localhost:8080/api/v1/users/delete/${account.id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
          });
          setAccounts(accounts.filter(a => a.id !== account.id));
          console.log("Account deleted successfully");
        } catch (error) {
          console.error("There was an error deleting the account!", error);
        }
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return (
    <div>
      {accounts.map(account => (
        <div key={account.id} className="account-item">
          <img src={ava_account} alt="" />
          <span>{account.name}</span>
          <span>{account.email}</span>
          <span>{account.gConnected ? "Yes" : "No"}</span>
          <span>{account.phone}</span>
          <span>{account.id}</span>
          <span>{account.role.name}</span>
          <EditOutlined className="item-icon" onClick={() => handleEditBtn(account)} />
          <DeleteOutlined className="item-icon" onClick={() => handleDeleteBtn(account)} />
        </div>
      ))}
    </div>
  );
};

AccountItem.propTypes = {
  account: PropTypes.object,
};

export default AccountItem;
