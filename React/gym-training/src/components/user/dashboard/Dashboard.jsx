import React, { useEffect, useState } from 'react';
import "./dashboard.css";
//import WorkoutCard from "./WorkoutCard";
import MonthlyWorkoutComparison from "./MonthlyWorkoutComparison";
import KcalBurnOverview from "./KcalBurnOverview";

const WorkoutCard = ({ workout }) => {
  return (
      <div className="workout-card">
          <p className="workout-time">Today</p>
          <p>Duration: {workout.duration}</p>
          <p>Workout details: {workout.description}</p>
      </div>
  );
};

const Dashboard = () => {
  const [workoutData, setWorkoutData] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const accessToken = localStorage.getItem("accessToken");

  const getVietnamDate = () => {
    const vietnamTimeOffset = 7 * 60; // Vietnam is UTC+7
    const localDate = new Date();
    const utcDate = new Date(localDate.getTime() + localDate.getTimezoneOffset() * 60000);
    const vietnamDate = new Date(utcDate.getTime() + vietnamTimeOffset * 60000);
    return vietnamDate.toLocaleDateString('en-CA'); // Format as YYYY-MM-DD
  };

  useEffect(() => {
    const fetchWorkoutData = async () => {
      try {
        const date = getVietnamDate();
        const response = await fetch(`http://localhost:8080/api/v1/workouts/recent-workout?date=${date}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          }
        });
        const data = await response.json();
        setWorkoutData(data.data);
      } catch (error) {
        console.error('Error fetching workout data:', error);
      }
    };

    fetchWorkoutData();
  }, []);

  return (
    <div className="home">
      <div className="home-chart">
        <div className="home-chart-overview">
          <div className="home-chart-overview-kcal">
            <div>
                <KcalBurnOverview />
            </div>
          </div>
          <div className="hom-chart-overview-worout">
            <div>List upcoming</div>
          </div>
        </div>
        <div>
       <MonthlyWorkoutComparison />
        </div>
      </div>
      <div className="home-list">
        <div className="home-list-workout">
          <div>Upcoming Workouts
            {workoutData.slice(0, showAll ? workoutData.length : 3).map((workout, index) => (
              <WorkoutCard key={index} workout={workout} />
            ))}
            <div className="view-all">
              <a onClick={() => setShowAll(!showAll)}>{showAll ? 'Show less' : 'View all'}</a>
            </div>
          </div>
        </div>
        <div className="home-list-achievement">
          <div>My Achievements
            <div className="achievement-card">
              <p className="achievement-title">5cm Waist Loss</p>
              <p className="achievement-description">Congrats! You've lost 5cm off your waist in two weeks. Keep it up!</p>
            </div>
            <div className="achievement-card">
              <p className="achievement-title">10kg Weight Increase</p>
              <p className="achievement-description">Awesome! You've increased your lifting weight by 10kg in your latest workout!</p>
            </div>
            <div className="achievement-card">
              <p className="achievement-title">30-Day Consistency</p>
              <p className="achievement-description">Congrats on maintaining a consistent workout routine for 30 days straight!</p>
            </div>
            <div className="view-all">
              <a>View all</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
