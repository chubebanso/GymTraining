import React, { useEffect, useState } from "react";
import "./MonthlyWorkoutComparison.css";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import axios from "axios";

const MonthlyWorkoutComparison = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          console.error("Access token not found!");
          return;
        }

        const currentMonthResponse = await axios.get(
          "http://localhost:8080/api/v1/schedule/duration-stats?year=2024&month=12",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        // Assuming last month is November 2024 for comparison
        const lastMonthResponse = await axios.get(
          "http://localhost:8080/api/v1/schedule/duration-stats?year=2024&month=11",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (
          currentMonthResponse.data.statusCode === 200 &&
          lastMonthResponse.data.statusCode === 200
        ) {
          // Extract and process the data
          const currentMonthData = currentMonthResponse.data.data;
          const lastMonthData = lastMonthResponse.data.data;

          // Create a combined data structure for the chart
          const days = Array.from(new Set([
            ...currentMonthData.map((item) => item.day),
            ...lastMonthData.map((item) => item.day),
          ])).sort((a, b) => a - b);

          const combinedData = days.map((day) => {
            const currentMonthDay = currentMonthData.find((item) => item.day === day) || { totalDuration: 0 };
            const lastMonthDay = lastMonthData.find((item) => item.day === day) || { totalDuration: 0 };

            return {
              day,
              currentMonth: currentMonthDay.totalDuration,
              lastMonth: lastMonthDay.totalDuration,
            };
          });

          setChartData(combinedData);
        }
      } catch (error) {
        console.error("Error fetching chart data: ", error);
      }
    };

    fetchChartData();
  }, []);

  return (
    <div className="monthly-workout-comparison">
      <h3>Monthly Time Workout Comparison</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
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
