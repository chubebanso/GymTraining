//import React from 'react'
import "./workout.css";

// eslint-disable-next-line react/prop-types
const Workout = ({ name, description, image, duration, calories }) => {
  return (
    <div className="workout">
      <div className="workout-img">
        <img src={image} alt="" />
      </div>
      <div className="workout-description">
        <span>{name}</span>
        <span>{description}</span>
        <span>{duration}min-{calories}cal</span>
      </div>
    </div>
  );
};

export default Workout;