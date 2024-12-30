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

const ActiveChart = () => {
  // Chart data
  const data = {
    labels: [5, 10, 15, 20, 25, 30], // Days of the month
    datasets: [
      {
        label: "Last Month",
        data: [4, 1, 3, 3, 2, 0], // Data for last month
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.1)",
        tension: 0.3, // Smooth curve
        pointBackgroundColor: "blue",
        borderWidth: 1,
      },
      {
        label: "Current Month",
        data: [3, 2, 1, 1, 3, 2], // Data for current month
        borderColor: "red",
        backgroundColor: "rgba(255, 0, 0, 0.1)",
        tension: 0.3, // Smooth curve
        pointBackgroundColor: "red",
        borderWidth: 1,
      },
    ],
  };

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
          text: "Performance",
        },
      },
    },
  };

  return (
    <>
      {/* <div>
        <button
          onClick={() => setTimePeriod("week")}
          style={{
            backgroundColor: timePeriod === "week" ? "black" : "white",
            color: timePeriod === "week" ? "white" : "black",
            marginRight: "10px",
          }}
        >
          Week
        </button>
        <button
          onClick={() => setTimePeriod("month")}
          style={{
            backgroundColor: timePeriod === "month" ? "black" : "white",
            color: timePeriod === "month" ? "white" : "black",
          }}
        >
          Month
        </button>
      </div> */}
      <Line data={data} options={options} />;
    </>
  );
};

export default ActiveChart;

// import { useState, useEffect } from "react";
// import {
//   Chart as ChartJS,
//   LineElement,
//   PointElement,
//   LinearScale,
//   Title,
//   Tooltip,
//   Legend,
//   CategoryScale,
// } from "chart.js";
// import { Line } from "react-chartjs-2";
// import axios from "axios"; // For API calls

// // Register Chart.js components
// ChartJS.register(
//   LineElement,
//   PointElement,
//   LinearScale,
//   CategoryScale,
//   Title,
//   Tooltip,
//   Legend
// );

// const ActiveChart = () => {
//   const [data, setData] = useState(null); // Chart data
//   const [timePeriod, setTimePeriod] = useState("week"); // 'week' or 'month'
//   const [loading, setLoading] = useState(true); // Loading state

//   // Fetch data from API based on time period
//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(`/api/performance?period=${timePeriod}`);
//         const { labels, lastMonthData, currentMonthData } = response.data;

//         // Update chart data
//         setData({
//           labels,
//           datasets: [
//             {
//               label: "Last Month",
//               data: lastMonthData,
//               borderColor: "blue",
//               backgroundColor: "rgba(0, 0, 255, 0.1)",
//               tension: 0.3,
//               pointBackgroundColor: "blue",
//               borderWidth: 1,
//             },
//             {
//               label: "Current Month",
//               data: currentMonthData,
//               borderColor: "red",
//               backgroundColor: "rgba(255, 0, 0, 0.1)",
//               tension: 0.3,
//               pointBackgroundColor: "red",
//               borderWidth: 1.5,
//             },
//           ],
//         });
//       } catch (error) {
//         console.error("Error fetching performance data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [timePeriod]); // Refetch data when timePeriod changes

//   // Chart options
//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: "bottom",
//       },
//       tooltip: {
//         enabled: true,
//       },
//     },
//     scales: {
//       x: {
//         beginAtZero: true,
//         title: {
//           display: true,
//           text: "Days",
//         },
//       },
//       y: {
//         beginAtZero: true,
//         title: {
//           display: true,
//           text: "Performance",
//         },
//       },
//     },
//   };

//   return (
//     <>
//       <div>
//         <button
//           onClick={() => setTimePeriod("week")}
//           style={{
//             backgroundColor: timePeriod === "week" ? "black" : "white",
//             color: timePeriod === "week" ? "white" : "black",
//             marginRight: "10px",
//           }}
//         >
//           Week
//         </button>
//         <button
//           onClick={() => setTimePeriod("month")}
//           style={{
//             backgroundColor: timePeriod === "month" ? "black" : "white",
//             color: timePeriod === "month" ? "white" : "black",
//           }}
//         >
//           Month
//         </button>
//       </div>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <Line data={data} options={options} />
//       )}
//     </>
//   );
// };

// export default ActiveChart;
