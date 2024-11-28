//import React from 'react'
import "./workout.css";
import gym_img from "../../assets/gym.jpg"

// eslint-disable-next-line react/prop-types
const Workout = ({ name, description, image, duration, calories }) => {
  return (
    <div className="workout">
      <div className="workout-img">
        <img src={gym_img} alt={image} />
      </div>
      <div className="workout-description">
        <span>{name}</span>
        <span>{description}</span>
        <span>{duration}min - {calories}kcal</span>
      </div>
    </div>
  );
};

export default Workout;