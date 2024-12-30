import "./HomeItem.css";
import { useContext } from "react";

import { WorkoutContext } from "../../../context/WorkoutContext";
import workout from "../../../assets/workout.png";
import user from "../../../assets/user.png";
const HomeItem = () => {
  const { workouts, users } = useContext(WorkoutContext);

  return (
    <div className="content-home">
      <div className="content-main">
        <div className="home-div">
          <div className="home-image">
            <img src={user} alt="user" width="100px" height="100px" />
            accounts
          </div>
          <div className="home-data">
            <span>{users.length}</span>
          </div>
        </div>
        <div className="home-div">
          <div className="home-image">
            <img src={workout} alt="workout" width="100px" height="100px" />
            workouts
          </div>
          <div className="home-data">
            <span>{workouts.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeItem;
