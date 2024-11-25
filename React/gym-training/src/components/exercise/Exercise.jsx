//import React from 'react'
import './Exercise.css'

// eslint-disable-next-line react/prop-types
const Exercise = ({name, description, progress}) => {
  return (
    <div className="exercise">
      <div className="exercise-img">
        <img src="" alt="Exercise" />
      </div>
      <div className="exercise-description">
        <span>{name}</span>
        <span>{description}</span>
        <span>Progress: {progress}</span>
      </div>
    </div>
  );
};

export default Exercise;
