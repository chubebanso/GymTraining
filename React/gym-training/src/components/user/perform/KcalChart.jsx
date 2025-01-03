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
      const today = new Date().toISOString().split("T")[0]; // Today's date in YYYY-MM-DD format

      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/schedule/calories-stats-in-week?date=${today}`
        );

        if (response.data.statusCode === 200) {
          const apiData = response.data.data;

          // Transform API data into chart format
          const labels = apiData.map((item) => `Day ${item.day}`);
          const lastWeekData = apiData.map((item) => item.totalCaloriesInLastWeek);
          const thisWeekData = apiData.map((item) => item.totalCaloriesInThisWeek);

          setChartData({
            labels,
            datasets: [
              {
                label: "Last Week",
                data: lastWeekData,
                borderColor: "blue",
                backgroundColor: "rgba(0, 0, 255, 0.1)",
                tension: 0.4, // Smooth curve
                pointBackgroundColor: "blue",
                borderWidth: 2,
              },
              {
                label: "This Week",
                data: thisWeekData,
                borderColor: "red",
                backgroundColor: "rgba(255, 0, 0, 0.1)",
                tension: 0.4, // Smooth curve
                pointBackgroundColor: "red",
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
        position: "bottom", // Display legend at the bottom
      },
      tooltip: {
        enabled: true, // Enable tooltips to display kcal details
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Days of the Week",
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
        <p>No data available for the selected week.</p>
      )}
    </div>
  );
};

export default KcalChart;
