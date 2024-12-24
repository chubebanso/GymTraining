import React from "react";
import "./MonthlyWorkoutComparison.css";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { day: 5, lastMonth: 1, currentMonth: 2 },
  { day: 10, lastMonth: 2, currentMonth: 4 },
  { day: 15, lastMonth: 3, currentMonth: 3 },
  { day: 20, lastMonth: 1, currentMonth: 0 },
  { day: 25, lastMonth: 2, currentMonth: 2 },
  { day: 30, lastMonth: 3, currentMonth: 3 },
];

const MonthlyWorkoutComparison = () => {
  return (
    <div className="monthly-workout-comparison">
      <h3>Monthly time Workout Comparison</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" label={{ value: "Day of Month", position: "insideBottom", offset: -5 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="lastMonth" stroke="#8884d8" name="Last Month" />
          <Line type="monotone" dataKey="currentMonth" stroke="#82ca9d" name="Current Month" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyWorkoutComparison;
