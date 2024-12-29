import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Import useParams
import { LeftCircleOutlined } from "@ant-design/icons";
import { WorkoutContext } from "../../../context/WorkoutContext";
import axios from "axios"; // Import axios
import "./WorkoutDetail.css";

const WorkoutDetail = () => {
  const { selectedWorkout } = useContext(WorkoutContext); // Lấy workout từ context
  const navigate = useNavigate();
  const { schedule_id, workout_id } = useParams(); // Lấy schedule_id và workout_id từ URL params

  // Debug params
  console.log("Schedule ID: ", schedule_id);
  console.log("Workout ID: ", workout_id);

  const handleBack = () => {
    navigate(-1);
  };

 const handleStart = async () => {
  if (schedule_id && workout_id) {
    try {
      const accessToken = localStorage.getItem("accessToken"); // Lấy access token từ localStorage
      if (!accessToken) {
        console.error("Access token not found!");
        navigate("/login");
        return;
      }

      console.log("Sending data to API as form-data:", {
        scheduleId: schedule_id,
        workoutId: workout_id,
      });

      // Tạo form-data
      const formData = new FormData();
      formData.append("scheduleId", schedule_id);
      formData.append("workoutId", workout_id);

      const response = await axios.post(
        "http://localhost:8080/api/v1/schedule/save-completed-workout",
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Thêm Authorization header
            "Content-Type": "multipart/form-data", // Định dạng là form-data
          },
        }
      );
      console.log("API response: ", response.data);

      // Điều hướng đến trang video sau khi gọi API thành công
      navigate(`/workout/video/${workout_id}`, { state: selectedWorkout });
    } catch (error) {
      console.error("Error calling API: ", error.response || error);
      alert("Failed to start workout. Please try again later.");
    }
  } else {
    console.error("Invalid schedule_id or workout_id!");
    alert("Invalid workout details. Please try again.");
  }
};


  useEffect(() => {
    if (!selectedWorkout) {
      navigate("/userworkout"); // Điều hướng nếu không có dữ liệu
    }
  }, [selectedWorkout, navigate]);

  if (!selectedWorkout) {
    return <p>Loading workout details...</p>;
  }

  return (
    <div className="workout-detail-container">
      <div className="workout-detail-header">
        <LeftCircleOutlined className="back-icon" onClick={handleBack} />
        <div className="workout-detail-title"> Workout: {selectedWorkout.name}</div>
      </div>
      <div className="workout-detail-main">
        <div className="workout-detail-main-left">
          <img
            src={`/avatars/${selectedWorkout.image}`}
            alt={selectedWorkout.name}
            className="workout-detail-img"
          />
          <button className="btn-start" onClick={handleStart}>
            START
          </button>
        </div>
        <div className="workout-detail-main-right">
          <div className="workout-calo-duration">
            <div className="workout-calo">Calo: {selectedWorkout.calories}</div>
            <div className="workout-duration">Time: {selectedWorkout.duration} min</div>
          </div>
          <div className="workout-exercise">
            {selectedWorkout.exercises?.map((exercise, index) => (
              <div key={index} className="exercise-item">
                <div>{exercise.name}</div>
                <div>{exercise.reps}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutDetail;