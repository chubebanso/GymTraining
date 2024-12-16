import {
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import ava_account from "../../../assets/ava_account.png";
import PropTypes from "prop-types";
import "./AccountItem.css";

const AccountItem = ({ account, onEdit, onDelete }) => {

  return (
    <div className="account-item">
        <img src={ava_account} alt="" />
        <span>{account.name}</span>
        <span>{account.email}</span>
        <span>{account.gConnected ? "Yes" : "No"}</span>
        <span>{account.phone}</span>
        <span>{account.id}</span>
        <span>{account.role.name}</span>
        <EditOutlined
          className="item-icon"
          onClick={() => onEdit(account.id)}
        />
        <DeleteOutlined
          className="item-icon"
          onClick={() => onDelete(account.id)}
        />
      </div>
  );
};

AccountItem.propTypes = {
  account: PropTypes.object,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default AccountItem;
