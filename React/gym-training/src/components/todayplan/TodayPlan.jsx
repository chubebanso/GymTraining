//import React from 'react'
import "./TodayPlan.css";
import Exercise from "../exercise/Exercise";
import { LeftCircleOutlined } from "@ant-design/icons";
import { RightCircleOutlined } from "@ant-design/icons";

const TodayPlan = () => {
  return (
    <div className="todayplan">
      <LeftCircleOutlined />
      <div className="todayplan-exercise">
        <Exercise name="Push up" description="100 push up a day" progress="30%"/>
        <Exercise name="Sit up" description="20 sit up a day" progress="30%" />
        <Exercise name="Plank" description="10min plank a day" progress="30%"/>
      </div>
      <RightCircleOutlined />
    </div>
  );
};

export default TodayPlan;
