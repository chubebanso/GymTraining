//import React from 'react'
import "./TodayPlan.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Exercise from "../exercise/Exercise";
import { LeftCircleOutlined } from "@ant-design/icons";
import { RightCircleOutlined } from "@ant-design/icons";

const TodayPlan = () => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/get-schedule-by-date",
          { params: { date: "2024-11-27" } }
        );
        const result = response.data;
        if (result.statusCode === 200) {
          const allWorkouts = result.data.flatMap(schedule => schedule.workout);
          setExercises(allWorkouts || []);
          console.log("exercises: ", exercises);
        } else {
          console.error("Error fetching data:", result.message);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="todayplan">
      <div className="todayplan-head">
        <h3>Today Plan</h3>
      </div>
      <div className="todayplan-main">
        <LeftCircleOutlined />
        <div className="todayplan-exercises">
          {exercises.map((exercise) =>
            <Exercise
              key={exercise.id}
              name={exercise.name}
              description={exercise.description}
              image={exercise.image}
              duration={exercise.duration}
              calories={exercise.calories}
            />
          )}
        </div>
        <RightCircleOutlined />
      </div>
    </div>
  );
};

export default TodayPlan;