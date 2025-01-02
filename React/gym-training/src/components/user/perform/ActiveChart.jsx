import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import axios from "axios";

// Register Chart.js components
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
);

const ActiveChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Get current year and month
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1; // getMonth() returns 0-based month

    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/schedule/duration-stats?year=${currentYear}&month=${currentMonth}`
        );
        if (response.data.statusCode === 200) {
          const apiData = response.data.data;

          // Transform API data into chart format
          const labels = apiData.map((item) => item.day); // Days of the month
          const totalDurations = apiData.map((item) => item.totalDuration); // Performance data

          setChartData({
            labels,
            datasets: [
              {
                label: `Duration (${currentMonth}/${currentYear})`,
                data: totalDurations,
                borderColor: "blue",
                backgroundColor: "rgba(0, 0, 255, 0.1)",
                tension: 0.3, // Smooth curve
                pointBackgroundColor: "blue",
                borderWidth: 1,
              },
            ],
          });
        } else {
          console.error("Error fetching data:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Days",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Total Duration",
        },
      },
    },
  };

  return (
    <div>
      {chartData ? (
        <Line data={chartData} options={options} />
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
  );
};

export default ActiveChart;
