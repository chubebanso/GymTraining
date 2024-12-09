import { Routes, Route } from "react-router-dom";
import TableWorkout from "../../components/admin/tableworkout/TableWorkout"
import AddWorkout from "../../components/admin/addworkout/AddWorkout"
import EditWorkout from "../../components/admin/editworkout/EditWorkout"
const Workout = () => {
  return (
    <Routes>
      <Route path="/" element={<TableWorkout />} />
      <Route path="/add" element={<AddWorkout />} />
      <Route path="/edit/:id" element={<EditWorkout />} />
    </Routes>
  )
}

export default Workout
