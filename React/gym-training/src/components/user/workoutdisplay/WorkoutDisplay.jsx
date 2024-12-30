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
  const [filteredWorkouts, setFilteredWorkouts] = useState([]);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isDurationMenuOpen, setIsDurationMenuOpen] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState('All');
const durations = ['All', '15', '30', '45', '60'];


  const navigate = useNavigate();

  const categories = ['All', 'Strength', 'Cardio', 'Yoga', 'Body Strength'];

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
          const fetchedWorkouts = apiData.data.flatMap((schedule) => {
            return schedule.workouts.map(workout => ({ ...workout, schedule_id: schedule.id }));
          });
          setQuickWorkout(fetchedWorkouts[0]);
          setTodayWorkouts(fetchedWorkouts);
          setFilteredWorkouts(fetchedWorkouts); // Initially show all workouts
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
      prevIndex + 3 >= filteredWorkouts.length ? prevIndex : prevIndex + 3
    );
  };

  const handleWorkoutClick = (workout) => {
    setWorkoutAsSelected(workout);
    navigate(`/userworkoutdetail/${workout.schedule_id}/${workout.id}`);
  };

  const toggleCategoryMenu = () => {
    setIsCategoryMenuOpen(!isCategoryMenuOpen);
  };
const filterWorkouts = (category, duration) => {
  let filtered = todayWorkouts;

  if (category !== 'All') {
    filtered = filtered.filter(workout => workout.category === category);
  }

  if (duration !== 'All') {
    const durationInMinutes = parseInt(duration, 10);
    filtered = filtered.filter(workout => workout.duration === durationInMinutes);
  }

  setFilteredWorkouts(filtered);
  setCurrentIndex(0); // Đặt lại phân trang
};

  const selectCategory = (category) => {
  setSelectedCategory(category);
  setIsCategoryMenuOpen(false);
  filterWorkouts(category, selectedDuration);
};

  const currentWorkouts = filteredWorkouts.slice(currentIndex, currentIndex + 3);
const toggleDurationMenu = () => {
  setIsDurationMenuOpen(!isDurationMenuOpen);
};
const selectDuration = (duration) => {
  setSelectedDuration(duration);
  setIsDurationMenuOpen(false);
  filterWorkouts(selectedCategory, duration);
};

  return (
    <div className="workoutdisplay">
      <div className="workout-header">
        <button className="my-goal">My Goals</button>
        <div className="workout-search">
          <input type="text" placeholder="Search by type, duration, or difficulty..." />
          <img src={searchIcon} alt="search" className="search-icon" />
        </div>
              <div className="workout-filter">
  {/* Phần Category */}
  <div className="category-dropdown">
    <button className="category" onClick={toggleCategoryMenu}>
      {selectedCategory === 'All' ? 'Category' : selectedCategory}
    </button>
    {isCategoryMenuOpen && (
      <div className="category-menu">
        {categories.map((category) => (
          <label key={category} className="category-option">
            <input
              type="radio"
              name="category"
              value={category}
              checked={selectedCategory === category}
              onChange={() => selectCategory(category)}
            />
            {category}
          </label>
        ))}
      </div>
    )}
  </div>

  {/* Phần Duration */}
  <div className="duration-dropdown">
    <button className="duration" onClick={toggleDurationMenu}>
  {selectedDuration === 'All' ? 'Duration' : `${selectedDuration} minutes`}
</button>

    {isDurationMenuOpen && (
      <div className="duration-menu">
       {durations.map((duration) => (
  <label key={duration} className="duration-option">
    <input
      type="radio"
      name="duration"
      value={duration}
      checked={selectedDuration === duration}
      onChange={() => selectDuration(duration)}
    />
    {duration === 'All' ? 'All' : `${duration} minute`}
  </label>
))}

      </div>
    )}
  </div>
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
                    src={`/avatars/${workout.image}`}
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
                  <img src={`/avatars/${quickWorkout.image}`} alt={quickWorkout.name} className="workout-img" />
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
