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

const { confirm } = Modal;

const AccountItem = ({ account }) => {
  const navigate = useNavigate();
  const handleEditBtn = () => {
    navigate(`edit/${account.acountID}`, { state: { account } });
  };

  const handleDeleteBtn = () => {
    confirm({
      title: "Are you sure delete this account?",
      icon: <ExclamationCircleFilled />,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        console.log("OK");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return (
    <div className="account-item">
      <img src={ava_account} alt="" />
      <span>{account.name}</span>
      <span>{account.email}</span>
      <span>{account.gConnected}</span>
      <span>{account.phone}</span>
      <span>{account.accountID}</span>
      <span>{account.role}</span>
      <EditOutlined className="item-icon" onClick={handleEditBtn} />
      <DeleteOutlined className="item-icon" onClick={handleDeleteBtn} />
    </div>
  );
};

AccountItem.propTypes = {
  account: PropTypes.object,
};
export default AccountItem;
