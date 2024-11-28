import { useState } from 'react';
import { WorkoutContext } from './WorkoutContext';
import axios from 'axios';
import PropTypes from 'prop-types';

const WorkoutContextProvider = ({ children }) => {
  const [workouts, setWorkouts] = useState([]);

  const getWorkouts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/get-schedule-by-date",
        { params: { date: "2024-11-27" } }
      );
      const result = response.data;
      if (result.statusCode === 200) {
        const allWorkouts = result.data.flatMap(schedule => schedule.workout);
        setWorkouts(allWorkouts || []);
      } else {
        console.error("Error fetching data:", result.message);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }
  return (
    <WorkoutContext.Provider value={
      {
        workouts,
        getWorkouts
      }
    }>
      {children}
    </WorkoutContext.Provider>
  );
};

// Add PropTypes validation
WorkoutContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default WorkoutContextProvider;