import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LeftCircleOutlined } from "@ant-design/icons";
import { WorkoutContext } from "../../../context/WorkoutContext";
import "./WorkoutDetail.css";
const WorkoutDetail = () => {
  const { selectedWorkout } = useContext(WorkoutContext); // Lấy workout từ context
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); 
  };
const handleStart = () => {
  if (selectedWorkout) {
    console.log("Navigating to video page with workout: ", selectedWorkout);
    navigate(`/workout/video/${selectedWorkout.id}`, { state: selectedWorkout });
  } else {
    console.error("No workout selected or invalid ID!");
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
          <button className="btn-start" onClick={handleStart}>START</button>
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