import React, { useEffect, useState } from 'react';
import "./dashboard.css";
import WorkoutList from "./WorkoutList";
import MonthlyWorkoutComparison from "./MonthlyWorkoutComparison";
import KcalBurnOverview from "./KcalBurnOverview";



const Dashboard = () => {

  return (
    <div className="home">
      <div className="home-chart">
        <div className="home-chart-overview">
          <div className="home-chart-overview-kcal">
            <div>
                <KcalBurnOverview />
            </div>
          </div>
        </div>
        <div>
       <MonthlyWorkoutComparison />
        </div>
      </div>
      <div className="home-list">
        <div className="home-list-workout">
            <WorkoutList />
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
