import { useEffect, useState } from "react";
import "./TodayPlan.css";
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const TodayPlan = ({ workouts, setWorkouts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  // Get today's date in Vietnam timezone
  const getVietnamDate = () => {
    const formatter = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Ho_Chi_Minh",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    const [{ value: year }, , { value: month }, , { value: day }] =
      formatter.formatToParts(new Date());
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const fetchWorkouts = async () => {
      const today = getVietnamDate();
      const accessToken = localStorage.getItem("accessToken");
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/get-schedule-by-date?date=${today}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const apiData = response.data;

        if (apiData.statusCode === 200 && apiData.data.length > 0) {
          const fetchedWorkouts = apiData.data.flatMap((schedule) =>
            schedule.workouts.map((workout) => ({
              ...workout,
              schedule_id: schedule.id,
              composite_id: `${schedule.id}-${workout.id}`,
            }))
          );
          setWorkouts(fetchedWorkouts); // Replace state with new workouts
        }
      } catch (error) {
        console.error("Error fetching workouts: ", error);
      }
    };

    fetchWorkouts();
  }, [setWorkouts]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 3, 0)); // Prevent going below 0
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + 3, workouts.length - 3) // Prevent exceeding bounds
    );
  };

  const handleWorkoutClick = (workout) => {
    navigate(`/userworkoutdetail/${workout.schedule_id}/${workout.id}`);
  };

  const currentWorkouts = workouts.slice(currentIndex, currentIndex + 3);

  return (
    <div className="todayplan">
      <div className="todayplan-head">
        <h3>Today Plan</h3>
      </div>
      <div className="todayplan-main">
        <LeftCircleOutlined className="today-icon" onClick={handlePrev} />
        <div className="todayplan-workouts">
          {currentWorkouts.map((workout) => (
            <div
              className="todayplan-item"
              key={workout.composite_id} 
              onClick={() => handleWorkoutClick(workout)}
            >
              <img
                src={`/avatars/${workout.image}`}
                alt={workout.name}
                className="workout-image"
              />
              <div className="workout-detail">
                <h4 className="workout-title">{workout.name}</h4>
                <p className="workout-description">{workout.description}</p>
                <div className="progress-bar">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${workout.progress || 0}%` }}
                  ></div>
                  <div className="workout-progress">{workout.progress || 0}%</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <RightCircleOutlined className="today-icon" onClick={handleNext} />
      </div>
      <hr />
    </div>
  );
};

TodayPlan.propTypes = {
  workouts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      image: PropTypes.string,
      progress: PropTypes.number,
      schedule_id: PropTypes.number,
    })
  ).isRequired,
  setWorkouts: PropTypes.func.isRequired,
};

export default TodayPlan;
