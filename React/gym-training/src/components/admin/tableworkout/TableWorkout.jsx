import "./TableWorkout.css";
import { Pagination } from "antd";
import { useState, useEffect } from "react";
import WorkoutItem from "../workoutitem/WorkoutItem";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TableWorkout = () => {
  const navigate = useNavigate();
  const [workoutList, setWorkoutList] = useState([]); // Dữ liệu từ API
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;

  // Hàm gọi API để lấy dữ liệu
  const fetchWorkoutList = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken"); 
      const response = await axios.get("http://localhost:8080/api/v1/workouts", {
        headers: {
          Authorization: `Bearer ${accessToken}`, 
        },
      });

      if (response.data.statusCode === 200) {
        // Chuyển muscleGroups thành chuỗi tên
        const updatedData = response.data.data.map((workout) => ({
          ...workout,
          muscles: workout.muscleGroups.map((group) => group.name).join(", "),
        }));
        setWorkoutList(updatedData); // Lưu dữ liệu từ API vào state
      } else {
        console.error("Failed to fetch workouts:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching workouts:", error);
    }
  };

  useEffect(() => {
    fetchWorkoutList();
  }, []);

  // Hàm thay đổi trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAddBtn = () => {
    navigate("add");
  };

  // Cắt dữ liệu theo trang
  const pagesData = workoutList.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="content-workout">
      <div className="table-workout-filter">
        <button className="btn-search" onClick={handleAddBtn}>Search by goal</button>
        <input type="search" placeholder="Filter by name" />
        <button className="btn-add" onClick={handleAddBtn}>Add new workout</button>
      </div>
      <div className="table-workout-header">
        <span>Preview</span>
        <span>Name</span>
        <span>Category</span>
        <span>Duration</span>
        <span>Muscles</span>
        <span>Edit</span>
        <span>Delete</span>
      </div>
      <div className="table-workout-list">
        {pagesData.map((workout) => (
          <WorkoutItem
            key={workout.id}
            workout={{
              image:workout.image,
              name: workout.name,
              category: workout.category,
              duration: `${workout.duration}m`,
              muscles: workout.muscles || "N/A", // Truyền chuỗi muscleGroups
              description: workout.description, // Nếu cần sử dụng mô tả
              workoutID: workout.id,
            }}
          />
        ))}
      </div>
      <div className="table-workout-pagination">
        <Pagination
          pageSize={pageSize}
          total={workoutList.length}
          current={currentPage}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default TableWorkout;
