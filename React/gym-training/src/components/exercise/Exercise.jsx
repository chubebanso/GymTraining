//import React from 'react'
import "./Exercise.css";

// eslint-disable-next-line react/prop-types
const Exercise = ({ name, description, image, duration, calories }) => {
  console.log("exercise1:", description)
  console.log("name:", name)
  return (
    <div className="exercise">
      <div className="exercise-img">
        <img src="" alt={image} />
      </div>
      <div className="exercise-description">
        <h3>{name}</h3>
        <p>{description}</p>
        <p>Duration: {duration}min</p>
        <p>Calories Burned: {calories}</p>
      </div>
    </div>
  );
};

export default Exercise;
