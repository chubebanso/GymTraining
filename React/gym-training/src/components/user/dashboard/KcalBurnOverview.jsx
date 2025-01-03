import { useEffect, useState } from "react";
import "./KcalBurnOverview.css";
import axios from "axios";
import { FaHeart, FaFireAlt, FaBolt } from "react-icons/fa";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ava_account from "../../../assets/ava_account.png";

const KcalBurnOverview = () => {
  const [workouts, setWorkouts] = useState([]);
  const [caloriesToday, setCaloriesToday] = useState(0); // State for today's calories
  const [caloriesLast7Days, setCaloriesLast7Days] = useState(0); // State for last 7 days' calories
  const [caloriesAllTime, setCaloriesAllTime] = useState(0); // State for all-time calories
  const dailyGoal = 500; // Example goal for daily calorie burn

  const progressPercentage = Math.min((caloriesToday / dailyGoal) * 100, 100); // Progress capped at 100%

  const getVietnamDate = () => {
    const vietnamTimeOffset = 7 * 60;
    const localDate = new Date();
    const utcDate = new Date(
      localDate.getTime() + localDate.getTimezoneOffset() * 60000
    );
    const vietnamDate = new Date(utcDate.getTime() + vietnamTimeOffset * 60000);
    return vietnamDate.toLocaleDateString("en-CA");
  };
  const today = getVietnamDate();
  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          console.error("Access token not found!");
          return;
        }

        const response = await axios.get(
          `http://localhost:8080/api/v1/get-schedule-by-date?date=${today}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.data.statusCode === 200 && response.data.data.length > 0) {
          const fetchedWorkouts = response.data.data.flatMap((schedule) =>
            schedule.completedWorkouts.map((workout) => ({
              id: workout.id,
              name: workout.name,
              image: workout.image,
              duration: workout.duration,
              calories: workout.calories,
            }))
          );
          setWorkouts(fetchedWorkouts);
        }
      } catch (error) {
        console.error("Error fetching workouts: ", error);
      }
    };

    const fetchCaloriesToday = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          console.error("Access token not found!");
          return;
        }

        const response = await axios.get(
          `http://localhost:8080/api/v1/schedule/calories/last-7-day?date=${today}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.data.statusCode === 200) {
          setCaloriesToday(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching today's calories: ", error);
      }
    };

    const fetchCaloriesLast7Days = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          console.error("Access token not found!");
          return;
        }

        const response = await axios.get(
          `http://localhost:8080/api/v1/schedule/calories/last-7-day?date=${today}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.data.statusCode === 200) {
          setCaloriesLast7Days(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching last 7 days' calories: ", error);
      }
    };

    const fetchCaloriesAllTime = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          console.error("Access token not found!");
          return;
        }

        const response = await axios.get(
          "http://localhost:8080/api/v1/schedule/calories/all",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.data.statusCode === 200) {
          setCaloriesAllTime(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching all-time calories: ", error);
      }
    };

    fetchWorkouts();
    fetchCaloriesToday();
    fetchCaloriesLast7Days(); // Fetch last 7 days' calories
    fetchCaloriesAllTime(); // Fetch all-time calories
  }, []);

  return (
    <div className="kcal-burn-overview">
      <h3 className="overview-title">Kcal Burn Overview</h3>
      <div className="kcal-burn-overview-container">
        <div className="kcal-progress-section">
          <div className="kcal-circle">
            <CircularProgressbar
              value={progressPercentage}
              text={`${caloriesToday} Kcal`}
              styles={buildStyles({
                pathColor: progressPercentage >= 100 ? "#f54b42" : "#4caf50",
                textColor: "#333",
                trailColor: "#d6d6d6",
                textSize: "12px",
              })}
            />
          </div>
          <div className="kcal-progress-info">
            <div className="kcal-stat">
              <FaHeart /> {caloriesLast7Days} Kcal (Last 7 days)
            </div>
            <div className="kcal-stat">
              <FaFireAlt /> {caloriesAllTime} Kcal (All Time)
            </div>
            <div className="kcal-stat">
              <FaBolt /> 72 Kcal (Average)
            </div>
          </div>
        </div>
        <div className="workout-list-section">
          {workouts.length > 0 ? (
            workouts.slice(0, 3).map((workout) => (
              <div key={workout.id} className="history-item">
                <div>
                  <img
                    className="item-img"
                    src={
                      workout.image ? `/avatars//${workout.image}` : ava_account
                    }
                    alt=""
                  />
                </div>
                <div className="item-info">
                  <div className="item-info-name">
                    <p>{workout.name}</p>
                    <p>{workout.description}</p>
                  </div>
                  <div className="item-info-name">
                    <p>{workout.duration}</p>
                    <p>{workout.calories}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No workouts available for the selected date.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default KcalBurnOverview;
