import React, { useEffect, useState } from 'react';
import './TodayPlan.css';
import { LeftCircleOutlined } from '@ant-design/icons';
import { RightCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const TodayPlan = () => {
  const [workouts, setWorkouts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate(); // Use the hook

  // Hàm lấy ngày theo giờ Việt Nam
const getVietnamDate = () => {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Ho_Chi_Minh",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const [{ value: year }, , { value: month }, , { value: day }] = formatter.formatToParts(new Date());
  return `${year}-${month}-${day}`;
};



  useEffect(() => {
    const fetchWorkouts = async () => {
      const today = getVietnamDate(); // Lấy ngày hôm nay theo giờ Việt Nam
      const accessToken = localStorage.getItem('accessToken'); // Lấy accessToken từ local storage
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/get-schedule-by-date?date=${today}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`, // Gửi token trong header
            },
          }
        );
        const apiData = response.data;

        if (apiData.statusCode === 200 && apiData.data.length > 0) {
          const fetchedWorkouts = apiData.data.flatMap((schedule) => schedule.workouts);
          setWorkouts(fetchedWorkouts);
        }
      } catch (error) {
        console.error('Error fetching workouts: ', error);
      }
    };

    fetchWorkouts();
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 3 < 0 ? 0 : prevIndex - 3));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 3 >= workouts.length ? prevIndex : prevIndex + 3
    );
  };
  const handleWorkoutClick = (workout) => {
    navigate(`/userworkoutdetail/${workout.schedule_id}/${workout.id}`); // Chuyển đến màn hình tập
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
            <div className="workout-item" key={workout.id} onClick={() => handleWorkoutClick(workout)}>
              <img
            src={`/avatars//${workout.image}`}
                alt={workout.name}
                className="workout-image"
              />
              <div className="workout-details">
                <h4 className="workout-title">{workout.name}</h4>
                <p className="workout-description">{workout.description}</p>
                <div className="progress-bar">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${workout.progress || 0}%` }}
                  ></div>
                </div>
                <p className="workout-progress">{workout.progress || 0}%</p>
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

export default TodayPlan;
