import "./HomeItem.css";
import { useEffect, useState } from "react";
import axios from "axios";
import workout from "../../../assets/workout.png";
import user from "../../../assets/user.png";

const HomeItem = () => {
  const [workouts, setWorkouts] = useState([]);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/users/getAll",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              "Content-Type": "application/json",
            },
          }
        );

        const result = response.data;
        if (result.statusCode === 200) {
          setUsers(result.data);
        } else {
          console.error(
            "Error fetching data:",
            result ? result.message : "No result data"
          );
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    const fetchWorkouts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/workouts",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        const result = response.data;
        if (result.statusCode === 200) {
          console.log("Workouts fetched successfully:", result.data);
          setWorkouts(result.data);
        } else {
          console.error("Error fetching workouts:", result.message);
        }
      } catch (error) {
        console.error("Workouts fetch error:", error);
      }
    };
    getUsers();
    fetchWorkouts();
  }, []);
  return (
    <div className="content-home">
      <div className="content-main">
        <div className="home-div">
          <div className="home-image">
            <img src={user} alt="user" width="100px" height="100px" />
            accounts
          </div>
          <div className="home-data">
            <span>{Array.isArray(users) ? users.length : 0}</span>
          </div>
        </div>
        <div className="home-div">
          <div className="home-image">
            <img src={workout} alt="workout" width="100px" height="100px" />
            workouts
          </div>
          <div className="home-data">
            <span>{Array.isArray(workouts) ? workouts.length : 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeItem;
