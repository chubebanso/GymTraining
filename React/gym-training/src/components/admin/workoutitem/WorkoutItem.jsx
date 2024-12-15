import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import ava_account from "../../../assets/keo_xa.png";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "./WorkoutItem.css";
import { Modal } from "antd";

const { confirm } = Modal;

const WorkoutItem = ({ workout }) => {
  const navigate = useNavigate();
  const handleEditBtn = () => {
    navigate(`edit/${workout.workoutID}`, { state: { workout } });
  };

  const handleDeleteBtn = () => {
    confirm({
      title: "Are you sure delete this workout?",
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
    <div className="workout-item">
      <img className="item-img"  src={workout.image ? `/avatars//${workout.image}` : ava_account} alt="" />
      <span>{workout.name}</span>
      <span>{workout.category}</span>
      <span>{workout.duration}</span>
      <span>{workout.muscles}</span>
      <EditOutlined className="item-icon" onClick={handleEditBtn} />
      <DeleteOutlined className="item-icon" onClick={handleDeleteBtn} />
    </div>
  );
};

WorkoutItem.propTypes = {
  workout: PropTypes.object,
};
export default WorkoutItem;
