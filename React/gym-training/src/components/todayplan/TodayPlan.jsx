//import React from 'react'
import "./TodayPlan.css";
//import axios from "axios";
//import { useState, useEffect } from "react";
import Exercise from "../exercise/Exercise";
import { LeftCircleOutlined } from "@ant-design/icons";
import { RightCircleOutlined } from "@ant-design/icons";

const TodayPlan = () => {
  //const [exercises, setExercises] = useState([]);

  const exercises = [
    {
      id: 1,
      name: "Chạy bộ",
      description: "Chạy bộ buổi sáng",
      image: "image_url",
      duration: 30,
      calories: 300,
    },
    {
      id: 2,
      name: "Đấm nhau",
      description: "Đấm Sơn",
      image: "image_url",
      duration: 30,
      calories: 300,
    },
  ];
  console.log("exercises: ", exercises);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://localhost:8080/api/v1/get-schedule-by-date",
  //         { params: { date: "2024-11-30" } }
  //       );
  //       const result = response.data;
  //       if (result.statusCode === 200) {
  //         setExercises(result.data[0]?.workout || []);
  //       } else {
  //         console.error("Error fetching data:", result.message);
  //       }
  //     } catch (error) {
  //       console.error("Fetch error:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    // <div className="todayplan">
    //   <LeftCircleOutlined />
    //   <div className="todayplan-exercise">
    //     <Exercise name="Push up" description="100 push up a day" progress="30%"/>
    //     <Exercise name="Sit up" description="20 sit up a day" progress="30%" />
    //     <Exercise name="Plank" description="10min plank a day" progress="30%"/>
    //   </div>
    //   <RightCircleOutlined />
    // </div>
    <div className="todayplan">
      <LeftCircleOutlined />
      <div className="todayplan-exercises">
        {exercises.map((exercise) => {
          <Exercise
            key={exercise.id}
            name={exercise.name}
            description={exercise.description}
            image={exercise.image}
            duration={exercise.duration}
            calories={exercise.calories}
          />;
        })}
      </div>
      <RightCircleOutlined />
    </div>
  );
};

export default TodayPlan;
