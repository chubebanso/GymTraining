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

const KcalChart = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const today = new Date();
      const year = today.getFullYear(); // Current year
      const month = today.getMonth() + 1; // Current month (0-based, so add 1)

      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/schedule/calories-stats-in-month?year=${year}&month=${month}`
        );

        if (response.data.statusCode === 200) {
          const apiData = response.data.data;

          // Transform API data into chart format
          const labels = apiData.map((item) => `Day ${item.day}`);
          const totalCalories = apiData.map((item) => item.totalCalories);

          setChartData({
            labels,
            datasets: [
              {
                label: "Kcal Burned",
                data: totalCalories,
                borderColor: "red",
                backgroundColor: "rgba(255, 0, 0, 0.1)",
                tension: 0.4, // Smooth curve
                pointBackgroundColor: "black",
                pointBorderColor: "white",
                pointBorderWidth: 2,
                borderWidth: 2,
              },
            ],
          });
        } else {
          setError("Failed to fetch data from the API.");
        }
      } catch (err) {
        console.error("Error fetching Kcal data:", err);
        setError("An error occurred while fetching the data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide legend since it’s a single dataset
      },
      tooltip: {
        enabled: true, // Enable tooltips to display kcal details
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Days of the Month",
        },
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Calories Burned (Kcal)",
        },
        grid: {
          color: "rgba(200, 200, 200, 0.3)", // Light grid lines
        },
      },
    },
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : chartData ? (
        <Line data={chartData} options={options} />
      ) : (
        <p>No data available for the selected month.</p>
      )}
    </div>
  );
};

export default KcalChart;
