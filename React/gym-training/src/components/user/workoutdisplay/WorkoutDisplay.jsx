import React, { useContext, useEffect, useState } from 'react';
import './WorkoutDisplay.css';
import { useNavigate } from 'react-router-dom';
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import { WorkoutContext } from '../../../context/WorkoutContext';
import searchIcon from '../../../assets/search.svg';
import axios from 'axios';

const WorkoutDisplay = () => {
  const { setWorkoutAsSelected } = useContext(WorkoutContext);
  const [quickWorkout, setQuickWorkout] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [todayWorkouts, setTodayWorkouts] = useState([]);
  const navigate = useNavigate();

  // Hàm lấy ngày theo giờ Việt Nam
  const getVietnamDate = () => {
    const vietnamOffset = 7 * 60; // GMT+7 in phút
    const localTimeOffset = new Date().getTimezoneOffset();
    const vietnamTime = new Date(new Date().getTime() + (vietnamOffset - localTimeOffset) * 60000);
    return vietnamTime.toISOString().split('T')[0];
  };

  useEffect(() => {
    const fetchWorkouts = async () => {
      const today = getVietnamDate();
      const accessToken = localStorage.getItem('accessToken');
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
          const fetchedWorkouts = apiData.data.flatMap((schedule) => schedule.workouts);
          setQuickWorkout(fetchedWorkouts[0]);
          setTodayWorkouts(fetchedWorkouts);
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
      prevIndex + 3 >= todayWorkouts.length ? prevIndex : prevIndex + 3
    );
  };

  const handleWorkoutClick = (workout) => {
    setWorkoutAsSelected(workout);
    navigate(`/userworkoutdetail/${workout.id}`);
  };

  const currentWorkouts = todayWorkouts.slice(currentIndex, currentIndex + 3);

  return (
    <div className="workoutdisplay">
      <div className="workout-header">
        <button className="my-goal">My Goals</button>
        <div className="workout-search">
          <input type="text" placeholder="Search by type, duration, or difficulty..." />
          <img src={searchIcon} alt="search" className="search-icon" />
        </div>
        <div className="workout-filter">
          <button className="category">Category</button>
          <button className="duration">Duration</button>
        </div>
      </div>

      <h3 className="workout-list-title">Workout List</h3>
      <div className="workout-list">
        <div className="workout-list-left">
          <div className="workout-list-item">
            <LeftCircleOutlined className="next-icon" onClick={handlePrev} />
            <div className="todayplan-workouts">
              {currentWorkouts.map((workout) => (
                <div
                  key={workout.id}
                  className="workout-item"
                  onClick={() => handleWorkoutClick(workout)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={`/avatars//${quickWorkout.image}`}
                    alt={workout.name}
                    className="workout-img"
                  />
                  <p>{workout.name}</p>
                </div>
              ))}
            </div>

            <RightCircleOutlined className="next-icon" onClick={handleNext} />
          </div>
          <div className="workout-function-item">
            <div className="workout-current">
              <div>It's currently 10AM! How about:</div>
              {quickWorkout ? (
                <div
                  className="workout-item"
                  onClick={() => handleWorkoutClick(quickWorkout)}
                  style={{ cursor: 'pointer' }}
                >
                  <img src={`/avatars//${quickWorkout.image}`} alt={quickWorkout.name} className="workout-img" />
                  <p>{quickWorkout.name}</p>
                </div>
              ) : (
                <div>No workout available</div>
              )}
            </div>
            <div className="workout-quick">
              <div>Quick Workout</div>
              {quickWorkout ? (
                <div
                  className="workout-item"
                  onClick={() => handleWorkoutClick(quickWorkout)}
                  style={{ cursor: 'pointer' }}
                >
                  <img src={`/avatars/${quickWorkout.image}`} alt={quickWorkout.name} className="workout-img" />
                  <p>{quickWorkout.name}</p>
                </div>
              ) : (
                <div>No workout available</div>
              )}
            </div>
          </div>
        </div>
        <div className="workout-list-right">
          <h5>Workout Tips</h5>
          <ul>
            <li>Warm up before your workout</li>
            <li>Cool down after your workout</li>
            <li>Stay hydrated during your workout</li>
            <li>Don't forget to eat healthy food</li>
            <li>Get enough sleep</li>
            <li>Workout regularly</li>
            <li>Do not overexert yourself</li>
            <li>Be patient with yourself</li>
            <li>Be positive</li>
            <li>Take breaks</li>
            <li>Be consistent</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WorkoutDisplay;
