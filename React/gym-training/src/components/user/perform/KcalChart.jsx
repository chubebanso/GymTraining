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
  // Static dataset for the week
  const data = {
    labels: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"], // Days of the week
    datasets: [
      {
        label: "Kcal Burned",
        data: [100, 150, 120, 200, 180, 160, 140], // Example kcal values
        borderColor: "red",
        backgroundColor: "rgba(255, 0, 0, 0.1)",
        tension: 0.4, // Smooth curve
        pointBackgroundColor: "black",
        pointBorderColor: "white",
        pointBorderWidth: 2,
        borderWidth: 2,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hides legend since it’s a single dataset
      },
      tooltip: {
        enabled: true, // Enables tooltips to display kcal details
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

  return <Line data={data} options={options} />;
};

export default KcalChart;
