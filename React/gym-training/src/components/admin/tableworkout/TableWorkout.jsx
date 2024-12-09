import "./TableWorkout.css"
import {  Pagination } from "antd"
import { useState } from "react"
import WorkoutItem from "../workoutitem/WorkoutItem"
import { useNavigate} from "react-router-dom"

const TableWorkout = () => {
  const navigate = useNavigate();

  const workoutList = Array.from({ length: 40 }, (_, index) => ({

    name: `Chong day ${index + 1}`,
    category: `Len xuong ${index + 1}`,
    duration: `${index + 1}m`,
    muscles: 'Xuu',
  }));

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;

  // Hàm thay đổi trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAddBtn = () => {
    navigate("add");
  }

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
          {pagesData.map((workout, index) => (
            <WorkoutItem key={index} workout={workout} />
          ))}
        </div>
        <div className="table-workout-pagination">
            <Pagination pageSize={pageSize}
          total={workoutList.length}
          current={currentPage}
          onChange={handlePageChange}/>
        </div>
    </div>
  )
}

export default TableWorkout
