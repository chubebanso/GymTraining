//import React from 'react'
import "./TodayPlan.css";
// import axios from "axios";
// import { useEffect, useContext } from "react";
import Workout from "../workout/Workout";
import { LeftCircleOutlined } from "@ant-design/icons";
import { RightCircleOutlined } from "@ant-design/icons";
// import { WorkoutContext } from "../../context/WorkoutContext";
import workout1 from "../../../assets/workout1.png";
import workout2 from "../../../assets/workout2.png";
import workout3 from "../../../assets/workout3.png";


const TodayPlan = () => {
  // const { workouts, getWorkouts } = useContext(WorkoutContext);
  // console.log("Workouts: ", workouts);

  // useEffect(() => {
  //   getWorkouts();
  // }, []);

  const workouts = [
    {
      id: 1,
      name: "Workout 1",
      description: "Description of Workout 1",
      image: workout1,
      duration: 30,
      calories: 200,
    },
    {
      id: 2,
      name: "Workout 2",
      description: "Description of Workout 2",
      image: workout2,
      duration: 45,
      calories: 250,
    },
    {
      id: 3,
      name: "Workout 3",
      description: "Description of Workout 3",
      image: workout3,
      duration: 60,
      calories: 300,
    }
  ];

  return (
    <div className="todayplan">
      <div className="todayplan-head">
        <h3>Today Plan</h3>
      </div>
      <div className="todayplan-main">
        <LeftCircleOutlined className="today-icon"/>
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
        <RightCircleOutlined className="today-icon"/>
      </div>
      <hr />
    </div>
  );
};

export default TodayPlan;