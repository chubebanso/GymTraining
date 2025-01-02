import "./Perform.css";
import HistoryItem from "./HistoryItem";
import { useState, useEffect } from "react";
import left_vec from "../../../assets/left-vec.png";
import right_vec from "../../../assets/right-vec.png";
import { CiStar, CiMedal, CiTrophy, CiLemon } from "react-icons/ci";
import ActiveChart from "./ActiveChart";
import KcalChart from "./KcalChart";
import axios from "axios";

const Perform = () => {
  const [workoutsHistory, setWorkoutsHistory] = useState([]); // State to store workouts
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  useEffect(() => {
    const fetchWorkouts = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("accessToken"); // Retrieve the token from localStorage
        const response = await axios.get(
          `http://localhost:8080/api/v1/workouts/history-workout-by-date?date=${selectedDate}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Add the Bearer token to the headers
            },
          }
        );
        setWorkoutsHistory(response.data); // Assuming response.data contains the workouts array
      } catch (err) {
        console.error("Error fetching workouts:", err);
        setError("Failed to fetch workouts. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, [selectedDate]);

  return (
    <div className="perform">
    <div className="perform-chart">
      <div className="perform-overview">
        <h2>Performance Chart</h2>
        <div className="perform-chart-container">
          <ActiveChart />
        </div>
      </div>
      <div className="perform-details">
        <div className="perform-details-chart">
          <h3>Kcal Burn Trends</h3>
          <div className="perform-chart-container">
            <KcalChart />
          </div>
        </div>
        <div className="perform-achieve">
          <h3>My Achievements</h3>
          <div className="achievement">
            <img src={left_vec} alt="left-vector" className="vector" />
            <div className="achievement-detail">
              <span>5cm Waist Loss</span>
              <p>
                Congrats! You’ve lost 5cm off your waist in two weeks. Keep it
                up!
              </p>
            </div>
            <img src={right_vec} alt="right-vector" className="vector" />
          </div>
          <div className="achievement">
            <div className="achievement-item">
              <div className="achievement-image">
                <CiStar className="achievement-icon" />
              </div>
              <p>7-Workout Week</p>
            </div>
            <div className="achievement-item">
              <div className="achievement-image">
                <CiLemon className="achievement-icon" />
              </div>
              <p>Move Goal 200%</p>
            </div>
            <div className="achievement-item">
              <div className="achievement-image">
                <CiMedal className="achievement-icon" />
              </div>
              <p>New Move Record</p>
            </div>

            <div className="achievement-item">
              <div className="achievement-image">
                <CiTrophy className="achievement-icon" />
              </div>
              <p>Longest Move Streak</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="perform-workout">
      <h3>Workout History</h3>
      <div className="perform-workout-header">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="date-picker"
        />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : workoutsHistory.length > 0 ? (
        workoutsHistory.map((workout) => (
          <HistoryItem key={workout.id} workout={workout} />
        ))
      ) : (
        <p>No workouts found for the selected date.</p>
      )}
    </div>
  </div>
);
};
export default Perform;
