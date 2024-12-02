//import React from 'react'
import "./TodayPlan.css";
// import axios from "axios";
import { useState } from "react";
import Workout from "../workout/Workout";
import { LeftCircleOutlined } from "@ant-design/icons";
import { RightCircleOutlined } from "@ant-design/icons";
// import { WorkoutContext } from "../../context/WorkoutContext";

const TodayPlan = () => {
  // const { workouts, getWorkouts } = useContext(WorkoutContext);
  // console.log("Workouts: ", workouts);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleLeftClick = () => {
    setCurrentIndex(
      currentIndex === 0 ? displayedWorkouts.length - 3 : currentIndex - 1
    );
  };

  // Handle right arrow click
  const handleRightClick = () => {
    setCurrentIndex(
      currentIndex === displayedWorkouts.length - 3 ? 0 : currentIndex + 1
    );
  };

  const displayedWorkouts = [
    {
      id: 1,
      name: "Push Ups",
      description: "Push up exercises",
      image: "image1.jpg",
      duration: 10,
      calories: 50,
    },
    {
      id: 2,
      name: "Squats",
      description: "Squats for lower body ",
      image: "image2.jpg",
      duration: 20,
      calories: 80,
    },
    {
      id: 3,
      name: "Running",
      description: "Cardio running",
      image: "image3.jpg",
      duration: 30,
      calories: 200,
    },
    {
      id: 4,
      name: "Jumping Jacks",
      description: "Full body exercise",
      image: "image4.jpg",
      duration: 40,
      calories: 60,
    },
    {
      id: 5,
      name: "Plank",
      description: "Core strengthening",
      image: "image5.jpg",
      duration: 50,
      calories: 40,
    },
  ];
  // useEffect(() => {
  //   getWorkouts();
  // }, []);

  return (
    <div className="todayplan">
      <div className="todayplan-head">
        <h3>Today Plan</h3>
      </div>
      <div className="todayplan-main">
        <LeftCircleOutlined className="left-arrow" onClick={handleLeftClick} />
        <div className="todayplan-workouts">
          {displayedWorkouts
            .slice(currentIndex, currentIndex + 3)
            .map((workout) => (
              <Workout
                key={workout.id}
                name={workout.name}
                description={workout.description}
                image={workout.image}
                duration={workout.duration}
                calories={workout.calories}
              />
            ))}
        </div>
        <RightCircleOutlined
          className="right-arrow"
          onClick={handleRightClick}
        />
      </div>
      <hr />
    </div>
  );
};

export default TodayPlan;
