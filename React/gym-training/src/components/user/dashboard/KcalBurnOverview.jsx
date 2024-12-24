import React from "react";
import "./KcalBurnOverview.css";
import { FaHeart, FaFireAlt, FaBolt } from "react-icons/fa";
import { RiRunLine } from "react-icons/ri";
import { FaBicycle } from "react-icons/fa"; // Replaced icon
import { GiWeightLiftingUp } from "react-icons/gi";

const KcalBurnOverview = () => {
  return (
    <div className="kcal-burn-overview">
      <h3>Kcal Burn Overview</h3>
      <div className="kcal-burn-overview-container">
        <div className="kcal-progress">
          <div className="kcal-circle">
            <p>Today</p>
            <p><strong>200 Kcal</strong></p>
          </div>
          <div className="kcal-progress-info">
            <div className="kcal-stat">
              <FaHeart /> 700 Kcal (Last 7 days)
            </div>
            <div className="kcal-stat">
              <FaFireAlt /> 84k Kcal (All Time)
            </div>
            <div className="kcal-stat">
              <FaBolt /> 72 Kcal (Average)
            </div>
          </div>
        </div>
        <div className="workout-list">
          <div className="workout-item">
            <div className="workout-icon">
              <RiRunLine />
            </div>
            <div className="workout-details">
              <strong>Indoor Run</strong>
              <p>5.56 km</p>
              <p>24 min - 348 Kcal</p>
            </div>
          </div>
          <div className="workout-item">
            <div className="workout-icon">
              <FaBicycle /> {/* Replaced icon */}
            </div>
            <div className="workout-details">
              <strong>Outdoor Cycle</strong>
              <p>4.22 km</p>
              <p>24 min - 248 Kcal</p>
            </div>
          </div>
          <div className="workout-item">
            <div className="workout-icon">
              <GiWeightLiftingUp />
            </div>
            <div className="workout-details">
              <strong>Arm Workout</strong>
              <p>30 min - 348 Kcal</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KcalBurnOverview;
