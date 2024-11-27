//import React from 'react'
import "./TodayPlan.css";
// import axios from "axios";
import { useEffect, useContext } from "react";
import Workout from "../workout/Workout";
import { LeftCircleOutlined } from "@ant-design/icons";
import { RightCircleOutlined } from "@ant-design/icons";
import { WorkoutContext } from "../../context/WorkoutContext";

const TodayPlan = () => {
  const { workouts, getWorkouts } = useContext(WorkoutContext);
  console.log("Workouts: ", workouts);

  useEffect(() => {
    getWorkouts();
  }, []);

  return (
    <div className="todayplan">
      <div className="todayplan-head">
        <h3>Today Plan</h3>
      </div>
      <div className="todayplan-main">
        <LeftCircleOutlined />
        <div className="todayplan-workouts">
          {workouts.map((workout) =>
            <Workout
              key={workout.id}
              name={workout.name}
              description={workout.description}
              image={workout.image}
              duration={workout.duration}
              calories={workout.calories}
            />
          )}
        </div>
        <RightCircleOutlined />
      </div>
    </div>
  );
};

export default TodayPlan;