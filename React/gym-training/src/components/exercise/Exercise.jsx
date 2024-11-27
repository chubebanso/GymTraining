//import React from 'react'
import "./Exercise.css";
import gym_img from "../../assets/gym.jpg"

// eslint-disable-next-line react/prop-types
const Exercise = ({ name, description, image, duration, calories }) => {
  console.log("exercise1:", description)
  console.log("name:", name)
  return (
    <div className="exercise">
      <div className="exercise-img">
        <img src={gym_img} alt={image} />
      </div>
      <div className="exercise-description">
        <span>{name}</span>
        <span>{description}</span>
        <span>Duration: {duration}min</span>
        <span>Calories Burned: {calories}</span>
      </div>
    </div>
  );
};

export default Exercise;